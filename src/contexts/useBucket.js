import React from 'react';
import { BucketContext } from './BucketContext'

const useBucket = () => {
  const bucketContext = React.useContext(BucketContext)
  return bucketContext;
}

export default useBucket