import { useState, useEffect } from 'react';
import { throttle } from './util';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const throttleHandleScroll = throttle(handleScroll);
  const threshold = 1000;
  useEffect(() => {

    window.addEventListener('scroll', throttleHandleScroll);
    return () => window.removeEventListener('scroll', throttleHandleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    let scrollValue = document.body.scrollTop;
    if (scrollValue == 0) {
      scrollValue = document.documentElement.scrollTop;
    }
    if (scrollValue + threshold > docHeight && !isFetching) {
      setIsFetching(true);
    }
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;