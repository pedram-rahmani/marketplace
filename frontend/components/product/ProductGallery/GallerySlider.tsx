import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import RatingStars from "@/components/ui/RatingStars/RatingStars";
import LikeDislike from "@/components/feedback/LikeDislike/LikeDislike";

const GallerySlider = ({ menuName }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentImageData, setCurrentImageData] = useState(null);

    const [productInfo, setProductInfo] = useState([
        {
            id: 1,
            name: "رسمی",
            data: [
                {
                    id: 1,
                    images: [
                        "/images/products/1.jpg",
                        "/images/products/1.jpg",
                        "/images/products/1.jpg",
                        "/images/products/1.jpg",
                    ],
                },
            ],
        },
        {
            id: 2,
            name: "خریداران",
            data: [
                {
                    id: 1,
                    name: "سارا احمدی",
                    text: "نیاز به بهبود داره.",
                    rating: 2,
                    likes: 2,
                    dislikes: 6,
                    liked: false,
                    disliked: false,
                    images: [
                        "/images/products/3.jpg",
                        "/images/products/3.jpg",
                    ],
                },
                {
                    id: 2,
                    name: "مهدی علوی",
                    text: "عالی بود!",
                    rating: 4,
                    likes: 12,
                    dislikes: 0,
                    liked: false,
                    disliked: false,
                    images: [
                        "/images/products/5.jpg",
                        "/images/products/6.jpg",
                    ],
                },
            ],
        },
        {
            id: 3,
            name: "ویدیوهای مگنت",
            data: [
                {
                    id: 1,
                    images: [
                        "/images/products/7.jpg",
                        "/images/products/8.webp",
                        "/images/products/2.jpg",
                    ],
                },
            ],
        },
    ]);

    // like
    const handleLikeToggle = (id) => {
        setProductInfo((prevProductInfo) =>
            prevProductInfo.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          data: product.data.map((comment) =>
                              comment.id === id
                                  ? {
                                        ...comment,
                                        likes: comment.liked
                                            ? comment.likes - 1
                                            : comment.likes + 1,
                                        liked: !comment.liked,
                                        dislikes: comment.disliked
                                            ? comment.dislikes - 1
                                            : comment.dislikes,
                                        disliked: false,
                                    }
                                  : comment
                          ),
                      }
                    : product
            )
        );
    };

    const handleDislikeToggle = (id) => {
        setProductInfo((prevProductInfo) =>
            prevProductInfo.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          data: product.data.map((comment) =>
                              comment.id === id
                                  ? {
                                        ...comment,
                                        dislikes: comment.disliked
                                            ? comment.dislikes - 1
                                            : comment.dislikes + 1,
                                        disliked: !comment.disliked,
                                        likes: comment.liked
                                            ? comment.likes - 1
                                            : comment.likes,
                                        liked: false,
                                    }
                                  : comment
                          ),
                      }
                    : product
            )
        );
    };

    const activeMenu = productInfo.find((item) => item.name === menuName);
    const images = activeMenu
        ? activeMenu.data.flatMap((item) => item.images)
        : [];

        const handleSlideChange = (swiper) => {
            const currentIndex = swiper.realIndex;
            const currentImage = images[currentIndex];
            const foundData = productInfo
                .flatMap((item) => item.data)
                .find((dataItem) => dataItem.images.includes(currentImage));

            // Update the current image data while keeping likes/dislikes intact
            setCurrentImageData(foundData);
        };

        const selectImg = (e) => {
            const imgElement = e.currentTarget.querySelector("img");
            if (imgElement) {
                const imgSrc = imgElement.getAttribute("src");
                const foundData = productInfo
                    .flatMap((item) => item.data)
                    .find((dataItem) => dataItem.images.includes(imgSrc));

                // Update the current image data while keeping likes/dislikes intact
                setCurrentImageData(foundData);
            }
        };

    useEffect(() => {
        if (!images.length) {
            console.warn("No images found for the selected menu.");
        }
    }, [images]);

    if (!activeMenu || !images.length) return <p>No images available</p>;

    return (
        <>
            <div className="flex max-w-3xl mx-auto">
                <div className="relative">
                    <button className="prev absolute top-1/2 left-14 z-10 transform -translate-y-1/2 bg-my-gray3 rounded-full p-2 opacity-60 text-my-Txt2 hover:bg-my-light1/80 transition-all">
                        <svg viewBox="0 0 24 24">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="next absolute top-1/2 right-14 z-10 transform -translate-y-1/2 bg-my-gray3 rounded-full p-2 opacity-60 text-my-Txt2 hover:bg-my-light1/80 transition-all">
                        <svg viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    <Swiper
                        modules={[Navigation, Pagination, Thumbs]}
                        navigation={{ nextEl: ".next", prevEl: ".prev" }}
                        thumbs={{ swiper: thumbsSwiper }}
                        pagination={{ clickable: true }}
                        onSlideChange={handleSlideChange}
                        loop
                        spaceBetween={20}
                        slidesPerView={1}
                        className="rounded-lg w-300 lg:w-[400px] lg:h-[40vh]"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={image + index}>
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="h-full object-cover rounded-lg mx-auto"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {currentImageData && (
                    <div className="mt-4 px-3 text-my-Txt1 max-w-[600px]">
                        <div className="flex items-center gap-x-3">
                            <div className="font-bold">
                                {currentImageData.name}
                            </div>
                            {currentImageData.rating && (
                                <RatingStars rating={currentImageData.rating} />
                            )}
                        </div>
                        {currentImageData.text && (
                            <p className="my-2">{currentImageData.text}</p>
                        )}
                        <div className="flex mt-4 [&>svg]:size-5">
                            {currentImageData.rating && (
                                <div>
                                    <LikeDislike
                                        info={currentImageData}
                                        onLikeChange={handleLikeToggle}
                                        onDislikeChange={handleDislikeToggle}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative w-full px-4 py-3 bg-my-dark4/50">
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={5}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    centeredSlides={false}
                >
                    {images.map((image, index) => (
                        <SwiperSlide
                            key={image + index}
                            className="w-16!"
                            onClick={selectImg}
                        >
                            <div className="flex items-center justify-center w-16 h-16 overflow-hidden">
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="object-cover w-full h-full rounded-md border hover:border-my-blue1 transition-all"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default GallerySlider;
