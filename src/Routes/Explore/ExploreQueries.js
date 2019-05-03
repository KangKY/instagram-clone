import {gql} from "apollo-boost";

export const EXPLORE = gql`
  query seeExplore($category:String) {
    seeExplore(category:$category) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
  }
`;
