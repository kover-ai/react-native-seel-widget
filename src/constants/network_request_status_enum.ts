export enum NetworkRequestStatusEnum {
  /* eslint-disable no-bitwise */
  Idle = 1 << 0,
  Refreshing = 1 << 1,
  LoadingMore = 1 << 2,
  Loading = Refreshing | LoadingMore,
  RefreshSuccess = 1 << 3,
  LoadMoreSuccess = 1 << 4,
  Success = RefreshSuccess | LoadMoreSuccess,
  RefreshFailed = 1 << 5,
  LoadMoreFailed = 1 << 6,
  Failed = RefreshFailed | LoadMoreFailed,
}
