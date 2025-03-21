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
      throw new ApiError(
        errorRes.message ?? "APIリクエスト中にエラーが発生しました",
        res.status,
        errorRes
      )
    }

    return res.json();

  } catch (error) {
    if (error instanceof ApiError) {
      throw error; //そのまま投げる
    } else {
      throw new ApiError('ネットワークエラーが発生しました', 0, error);
    }
  }
}
