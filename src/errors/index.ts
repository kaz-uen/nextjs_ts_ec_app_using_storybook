/**
 * APIエラーを表すカスタムエラークラス
 */
export class ApiError extends Error {
  status: number;
  info?: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;

    // TypeScriptでのプロトタイプチェーンを正しく保持するため
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  // エラーの詳細情報を文字列として返却
  getErrorDetail(): string {
    return `Status: ${this.status}, Message: ${this.message}, Info: ${JSON.stringify(this.info)}`;
  }
}
