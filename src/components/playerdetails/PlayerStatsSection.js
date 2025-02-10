import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Loader from '../loader';

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ScrollContent = styled.div`
  display: flex;
  overflow-x: auto;
  width:94vw;
  gap: 10px;
  padding: 10px 0;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(ScrollButton)`
  left: 0;
`;

const NextButton = styled(ScrollButton)`
  right: 0;
`;

const Match = styled.div`
  border: 1px solid #007bff;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 120px;
  border-radius: 8px;
  background-color: ${(props) => (props.highlight ? '#436cab' : '#fff')};
  color: ${(props) => (props.highlight ? '#fff' : '#007bff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  p {
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
  }
`;

const Heading = styled.h3`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 15px;
  font-size: 24px;
  color: #333;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const PlayerStatsSection = ({ title, matches, playerDetail, statType }) => {
  const scrollRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        setIsPrevDisabled(scrollLeft <= 0);
        setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Heading>{title}</Heading>
      <ScrollContainer>
        <PrevButton onClick={() => scroll('left')} disabled={isPrevDisabled}><FaChevronLeft /></PrevButton>
        <ScrollContent ref={scrollRef}>
          {matches?.length > 0 ? matches?.map((_doc) => {
            const playerStats = _doc?.teamHomePlayers?.find((p) => p?.playerId == playerDetail?.id) || _doc?.teamAwayPlayers?.find((p) => p?.playerId == playerDetail?.id);
            if (!playerStats) return null;

            return (
              <Match key={_doc.id} highlight={statType === 'batting' ? playerStats?.runs > 50 : playerStats?.wickets > 3}>
                {statType === 'batting' ? (
                  <>
                    <p style={{ color: '#007bff' }}>{playerStats?.runs} ({playerStats?.balls})</p>
                    <p style={{ color: '#333' }}>{_doc?.matchdetails[0]?.teamHomeCode?.toUpperCase()} vs {_doc?.matchdetails[0]?.teamAwayCode?.toUpperCase()}</p>
                    <p style={{ color: '#808080' }}>{new Date(_doc?.matchdetails[0]?.date).toLocaleDateString()}</p>
                  </>
                ) : (
                  <>
                    <p style={{ color: '#007bff' }}>{playerStats?.wickets} Wickets</p>
                    <p style={{ color: '#333' }}>{_doc?.matchdetails[0]?.teamHomeCode?.toUpperCase()} vs {_doc?.matchdetails[0]?.teamAwayCode?.toUpperCase()}</p>
                    <p style={{ color: '#808080' }}>{new Date(_doc?.matchdetails[0]?.date).toLocaleDateString()}</p>
                  </>
                )}
              </Match>
            );
          }) : (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}
        </ScrollContent>
        <NextButton onClick={() => scroll('right')} disabled={isNextDisabled}><FaChevronRight /></NextButton>
      </ScrollContainer>
    </div>
  );
};

export default PlayerStatsSection;