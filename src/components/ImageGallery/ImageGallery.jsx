import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import  Modal  from '../Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImage } from '../../Api/ApiGet';
import { ImageGaleryStyled } from './ImageGallery.styled';

const ImageGallery = ({ searchImage }) => {
  const [gallery, setGallery] = useState([]);
  const [searchCopy, setSearchCopy] = useState(null);

  const [page, setPage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
useEffect(() => {
    if (searchImage !== searchCopy) {
      setPage(1);
      setSearchCopy(searchImage);
      setIsLoading(true);
    }
 
  }, [searchImage, searchCopy]);

   
  useEffect(() => {
    if (searchImage || (searchImage && page !== 1)) getImage();
  }, [page, searchCopy]);


  const getImage = async () => {
    try {
      const { hits, totalHits } = await fetchImage(searchImage, page);

      if (!totalHits) {
        return toast.error('Something went wrong:) Please try again.');
      }

      setGallery(page === 1 ? hits : [...gallery, ...hits]);
      setTotalHits(totalHits);
    } catch (error) {
      toast.error('Something went wrong:) Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const changePage = () => {
    setPage(prev => prev + 1);
    return toast.error('Something went wrong:) Please try again.');
  };

  const openModal = data => {
    setModalImage(data);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      {!totalHits && <ToastContainer />}
      {searchCopy && isLoading ? (
        <Loader />
      ) : (
        <ImageGaleryStyled>
          {gallery && (
            <ImageGalleryItem gallery={gallery} openModal={openModal} />
          )}
        </ImageGaleryStyled>
      )}{' '}
      {totalHits > gallery.length && <Button changePage={changePage} />}
      {modalImage && <Modal closeModal={closeModal} modalImage={modalImage} />}
    </div>
  );
};



export default ImageGallery;
