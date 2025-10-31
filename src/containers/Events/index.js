import { useEffect, useMemo, useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { events = [], error, loading } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredByType = useMemo(
    () => (type ? events.filter((event) => event.type === type) : events),
    [events, type]
  );

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredByType.length / PER_PAGE));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPage, filteredByType.length]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE;
    return filteredByType.slice(startIndex, startIndex + PER_PAGE);
  }, [filteredByType, currentPage]);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType || null);
  };

  const pageNumber = Math.max(1, Math.ceil(filteredByType.length / PER_PAGE));
  const typeList = useMemo(
    () => Array.from(new Set(events.map((event) => event.type))),
    [events]
  );

  return (
    <>
      {error && <div>An error occured</div>}
      {loading ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Categories</h3>
          <Select selection={typeList} onChange={changeType} />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
            {paginatedEvents.length === 0 && (
              <div>Aucun evenement pour cette categorie.</div>
            )}
          </div>
          <div className="Pagination">
            {pageNumber > 1 &&
              [...Array(pageNumber)].map((_, n) => (
                // eslint-disable-next-line react/no-array-index-key
                <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                  {n + 1}
                </a>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
