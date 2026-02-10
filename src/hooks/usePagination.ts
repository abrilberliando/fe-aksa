export const usePagination = (totalItems: number, itemsPerPage: number, currentPage: number) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  return { totalPages, startIndex, endIndex, safePage };
};