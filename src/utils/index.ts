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
      const errorRes = await res.json();
      throw new ApiError( // 1. ここで新しいApiErrorインスタンスを生成して投げる
        errorRes.message ?? "APIリクエスト中にエラーが発生しました", // エラーメッセージ
        res.status, // HTTPステータスコード
        errorRes // 生のエラーレスポンス
      )
    }

    // 正常なレスポンスの場合、JSONとしてパース
    return res.json();

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
      // その他のエラーはApiErrorでラップして投げる
      let errorMessage: string;
      let errorType: string;

      if (error instanceof TypeError) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "ネットワーク接続に失敗しました";
          errorType = 'NETWORK_ERROR';
        } else if (error.message.includes('Invalid URL')) {
          errorMessage = "無効なURLです";
          errorType = 'INVALID_URL';
        } else {
          errorMessage = "データの形式が不正です";
          errorType = 'TYPE_ERROR';
        }
      } else if (error instanceof SyntaxError) {
        errorMessage = "レスポンスの解析に失敗しました";
        errorType = 'PARSE_ERROR';
      } else {
        errorMessage = "予期せぬエラーが発生しました";
        errorType = 'UNKNOWN_ERROR';
      }

      throw new ApiError(
        errorMessage,
        0,
        {
          type: errorType,
          originalError: error,
          message: error.message
        }
      );
    }
  }
}
