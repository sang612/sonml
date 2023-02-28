export const handlePagination = (limit, page) => {
  let _limit = 10;

  if (limit) {
    _limit = Math.min(Number(limit <= 0 ? 10 : limit), 100);
  }

  const _page = Math.max(Number(page), 1) || 1;
  const _skip = (_page - 1) * _limit;

  return { limit: _limit, page: _page, skip: _skip };
};
