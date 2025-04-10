/**
 * APIエラーを表すカスタムエラークラス
 *
 * ApiErrorクラスは、APIリクエスト中に発生するエラーを表現するためのカスタムエラークラスで、
 * HTTPステータスコードや追加のエラー情報など、アプリケーション全体のエラーハンドリングを一元化するために使用される
 */
export class ApiError extends Error {
  // JavaScriptの組み込みErrorクラスを継承
  // これにより、標準のエラー機能（スタックトレースなど）を継承しつつ、独自の機能を追加できる
  status: number;
  info?: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message); //親クラスのErrorコンストラクタを呼び出し
    this.status = status; //HTTPステータスコード（400, 401, 404など）
    this.info = info; //追加のエラー情報

    // TypeScriptでのプロトタイプチェーンを正しく保持するため
    Object.setPrototypeOf(this, ApiError.prototype);
    /**
     * プロトタイプチェーンの問題:
     * JavaScriptでは、クラスを継承すると、プロトタイプチェーンが作成されるが、
     * Errorクラスを継承する場合、特殊な事情により正しくプロトタイプチェーンが設定されず、instanceofによる型チェックが正しく動作しない問題が発生する。
     * そこで、Errorクラスを継承する場合は、上記コードにより、this（新しく作成されたインスタンス）のプロトタイプをApiError.prototypeに設定する。
     * これにより、instanceofによる型チェックが正しく動作するようになる。
     * 特に、if (error instanceof ApiError) のように型判別を行う際には、この処理が必要になる。
     */
  }

  // エラーの詳細情報を文字列として返却（デバッグやログ出力用）
  getErrorDetail(): string {
    return `Status: ${this.status}, Message: ${this.message}, Info: ${JSON.stringify(this.info)}`;
  }
}
