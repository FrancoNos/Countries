import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/countrySlice";
import CardPais from "../CardPais/countryCard";
import style from "./homePage.module.css";

const itemsPerPage = 8;
const visiblePageButtons = 10;

const HomePage = () => {
  const dispatch = useDispatch();
  const allcountries = useSelector((state) => state.country.allCountries);
  const currentPage = useSelector((state) => state.country.currentPage);

  useEffect(() => {
    if (allcountries.length > 0) {
      const totalPages = Math.ceil(allcountries.length / itemsPerPage);
      if (currentPage >= totalPages) {
        dispatch(setCurrentPage(totalPages - 1));
      }
    }
  }, [allcountries, currentPage, dispatch]);

  const renderPageButtons = () => {
    const totalPages = Math.ceil(allcountries.length / itemsPerPage);
    const startPage = Math.max(
      0,
      Math.min(
        currentPage - Math.floor(visiblePageButtons / 2),
        totalPages - visiblePageButtons
      )
    );
    const endPage = Math.min(startPage + visiblePageButtons, totalPages);

    return (
      <div className={style.pageButtonsContainer}>
        {currentPage > 0 && (
          <button
            key={"<<"}
            className={style.pageBtn}
            type=""
            onClick={() => dispatch(setCurrentPage(0))}
          >
            {"<<"}
          </button>
        )}
        {Array.from({ length: endPage - startPage }).map((_, i) => {
          const pageNumber = startPage + i;
          const buttonClass =
            pageNumber === currentPage
              ? style.selectedPageButton
              : style.pageBtn;
          return (
            <button
              className={buttonClass}
              key={pageNumber}
              onClick={() => dispatch(setCurrentPage(pageNumber))}
            >
              {pageNumber + 1}
            </button>
          );
        })}
        {currentPage < totalPages - 1 && (
          <button
            key={">>"}
            className={style.pageBtn}
            type=""
            onClick={() => dispatch(setCurrentPage(totalPages - 1))}
          >
            {">>"}
          </button>
        )}
      </div>
    );
  };

  const renderCountryCards = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allcountries
      .slice(startIndex, endIndex)
      .map(({ id, name, continents, flags }) => (
        <CardPais
          id={id}
          key={id + " " + name}
          name={name}
          continents={continents}
          flags={flags}
        />
      ));
  };

  return (
    <div>
      <div className={style.container}>{renderCountryCards()}</div>
      <div className={style.pagination}>{renderPageButtons()}</div>
    </div>
  );
};

export default HomePage;
