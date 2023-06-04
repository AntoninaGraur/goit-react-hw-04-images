
import React, { useState } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
const [searchImage, setSearchImage] = useState('');

const handleFormSubmit = (searchImage) => {
setSearchImage(searchImage);
};

return (
<div>
<Searchbar onSubmit={handleFormSubmit} />
<ImageGallery searchImage={searchImage} />
</div>
);
};

export default App;