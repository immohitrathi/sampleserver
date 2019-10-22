import React, {memo} from 'react';
import PhotoListCardLoading from './PhotoListCardLoading';

const PhotoLoader = memo(() => {
    return (
        <>
            <PhotoListCardLoading key={1}  />
            <PhotoListCardLoading key={2} odd={true} />
            <PhotoListCardLoading key={3} />
        </>
    )
});

export default PhotoLoader;