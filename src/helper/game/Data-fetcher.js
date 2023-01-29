import {useState, useEffect} from 'react';

export const useDataFetching = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const _apiAdressEasy = "https://the-trivia-api.com/api/questions?limit=5&difficulty=easy";
    const _apiAdressMedium = "https://the-trivia-api.com/api/questions?limit=5&difficulty=medium";
    const _apiAdressHard = "https://the-trivia-api.com/api/questions?limit=5&difficulty=hard";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchEasyData = await fetch(_apiAdressEasy);
            const fetchMediumData = await fetch(_apiAdressMedium);
            const fetchHardData = await fetch(_apiAdressHard);
            const response = await Promise.all([fetchEasyData, fetchMediumData, fetchHardData])  
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });

                const easyData = await response[0].json();
                const mediumData = await response[1].json();
                const hardData = await response[2].json();
                const result = easyData.concat(mediumData, hardData).map(_transformSummary);
                setData(result);
                setIsLoading(false);
        }
        fetchData();
    }, []);

    return {
        data,
        isLoading
    };
};

const _transformSummary = item => {
    return {    
        id: item.id,
        question: item.question,
        answers: shuffleArray(addAnswers(item.incorrectAnswers, item.correctAnswer)),
        correct: item.correctAnswer,
    };
};

const addAnswers = (arr, answer) => {
    if (arr) {
        arr.push(answer)
        return arr
    } else return []
};

const shuffleArray = arr => {
    let res = []
    res = arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value) 
    return res
};

