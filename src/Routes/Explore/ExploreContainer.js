import React, {useState} from 'react'
import { useQuery } from 'react-apollo-hooks';
import { EXPLORE } from './ExploreQueries';
import ExplorePresenter from './ExplorePresenter';

export default () => {

  const category = useState("");
  const { data, loading } = useQuery(EXPLORE, {
    skip:category === "",
    variables: {
      category:category.value
    }
  });

  console.log(data);
  return (
    <ExplorePresenter loading={loading} data={data} />
  )
}


