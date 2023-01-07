import React from "react";

export const Paginate = ({ postsPerPage, TotalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(TotalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((page) => {
            return (
              <li key={page} className="page-item">
                <a onClick={() => paginate(page)} className="page-link">
                  {" "}
                  {page}{" "}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
