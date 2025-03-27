import { ApiError } from "@/errors";

/**
 * APIクライアントへのリクエスト送信用関数
 */
export const fetcher = async <T>(
  resource: RequestInfo,
  init: RequestInit,
): Promise<T> => {
  try {
    const res = await fetch(resource, init);

    // レスポンスが失敗した時に例外を投げる
    if (!res.ok) {
      let errorData;

      try {
        // エラーレスポンスのJSONパース
        errorData = await res.json();
      } catch (parseError) {
        // JSONパースに失敗した場合
        throw new ApiError( // 1. ここで新しいApiErrorインスタンスを生成して投げる
          "エラーレスポンスの解析に失敗しました",
          res.status, // HTTPステータスコード
          {
            type: 'ERROR_RESPONSE_PARSE_FAILED',
            originalError: parseError,
            responseText: await res.clone().text(), // 生のレスポンスデータを保持
            contentType: res.headers.get('content-type'), // レスポンスのContent-Type
          }
        );
      }

      throw new ApiError( // 1. ここで新しいApiErrorインスタンスを生成して投げる
        errorData.message ?? "APIリクエスト中にエラーが発生しました",
        res.status, // HTTPステータスコード
        errorData
      );
    }

    try {
      // 正常レスポンスのJSONパース
      return await res.json() as T;
    } catch (parseError) {
      // JSONパースに失敗した場合
      throw new ApiError(
        "レスポンスの解析に失敗しました",
        0,
        {
          type: 'RESPONSE_PARSE_ERROR',
          originalError: parseError,
          responseText: await res.clone().text(), // レスポンスの生データを保持
          contentType: res.headers.get('content-type'),
          expectedType: 'application/json',
          status: res.status,
        }
      );
    }

  } catch (error) {
    if (error instanceof ApiError) { // 2. 上で投げられたApiErrorがここでキャッチされる（errorがApiErrorクラスのインスタンスかどうか判定）
      throw error; // ApiErrorはそのまま上位に伝播（つまり、errorを呼び出し階層の上位（親）のコードに転送し、catch(error)のerrorに渡すようにする）
      /**
       * HTTPステータスコードごとのエラーハンドリングはこのfetcher関数内で行わず呼び出し元で行う
       * そのほうが、各APIエンドポイントごとの要件に応じた適切なエラーハンドリングが可能となり、
       * ・コードの責務が明確
       * ・再利用性が高い
       * ・保守が容易
       * ・テストがしやすい
       */
    } else { // 3. errorがApiErrorでない場合、つまりネットワークエラーなど
      let errorMessage: string;
      let errorType: string;
      let errorDetails: Record<string, unknown> = {};

      if (error instanceof TypeError) {
        console.log(error.message)
        // TypeErrorの詳細な分類
        if (error.message.includes('Failed to fetch')) {
          // ネットワークエラーの種類を詳細に分類
          if (error.message.includes('timeout')) {
            errorMessage = "接続がタイムアウトしました";
            errorType = 'TIMEOUT_ERROR';
          } else if (error.message.includes('CORS')) {
            errorMessage = "クロスオリジンリクエストが拒否されました";
            errorType = "CORS_ERROR";
          } else {
            errorMessage = "ネットワーク接続に失敗しました";
            errorType = 'NETWORK_ERROR';
          }
        } else if (error.message.includes('Invalid URL')) {
          errorMessage = "無効なURLです";
          errorType = 'INVALID_URL';
        } else {
          errorMessage = "データの形式が不正です";
          errorType = 'TYPE_ERROR';
        }
        errorDetails = {
          originalMessage: error.message,
          url: resource.toString()
        };
      } else if (error instanceof SyntaxError) {
        // JSONパースエラー
        errorMessage = "レスポンスの解析に失敗しました";
        errorType = 'PARSE_ERROR';
        errorDetails = {
          originalMessage: error.message
        };
      } else {
        // その他の予期せぬエラー
        errorMessage = "予期せぬエラーが発生しました";
        errorType = 'UNKNOWN_ERROR';
        if (error instanceof Error) {
          errorDetails = {
            originalMessage: error.message
          };
        } else {
          // Error以外のオブジェクトがスローされることは稀だが、エラー情報を常に安全に取得する
          errorDetails = {
            originalValue: String(error)
          }
        }
      }

      // その他のエラーはApiErrorでラップして投げる
      throw new ApiError(
        errorMessage, //ユーザーフレンドリーなメッセージ
        0, //HTTPエラー以外を示す特別なステータスコード
        {
          type: errorType, //エラーの種類を示す文字列
          ...errorDetails, //エラーの詳細情報
          originalError: error, //デバッグ用の元のエラーオブジェクト
        }
      );
    }
  }
}
