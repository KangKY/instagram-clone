import React from 'react'
import { useQuery } from 'react-apollo-hooks';
import { SEARCH } from './SearchQueries';
import SearchPresenter from './SearchPresenter';

export default ({location : {search}}) => {
  const term = search.split('=')[1];
  const { data, loading } = useQuery(SEARCH, {
    skip:term === undefined,
    variables: {
      term
    }
  });

  console.log(data);
  return (
    <SearchPresenter searchTerm={term} loading={loading} data={data} />
  )
}


