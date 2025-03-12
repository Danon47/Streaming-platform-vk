const formatRating = (rating: number) => {
    return rating.toLocaleString('ru-RU', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
};

export default formatRating