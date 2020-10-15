import React, { useState, useEffect } from 'react';
import '../App.css';
import { Card, CardProps } from './Card';

export enum Difficulty {
    None,
    Easy,
    Medium,
    Hard
  }

export interface GameProps {
    selectedDifficulty: Difficulty,
    setDifficultyLevel(difficulty: Difficulty): void,
}

let emojiArray = ['🌲', '🌵', '🌻', '🌸', '🍄', '🐞', '🕷️', '🐢', '🐉', '🐘', '🐅', '🐒', '🍏', '🍅', '🌽', '🍆'];

export const Game: React.FC<GameProps> = (props: GameProps) => {

    const [emojisInPlay, setEmojisInPlay] = useState<Array<CardProps>>();
    const [selectedCard, setSelectedCard] = useState<CardProps>();

    useEffect(() => {
        // Emoji's initialised
        const generateGameCards = () => {
            let gameCards = new Array<CardProps>();
            switch(props.selectedDifficulty)
            {
                case 1:
                    {
                        // Generate Easy Pack of Pairs : 6 Total
                        for(let i = 0; i < 3; i++)
                        {
                            gameCards.push({
                                emoji: emojiArray[i],
                                isFlipped: false,
                                isPaired: false,
                                isSelected: false,
                                selectCard: () => selectCard
                            })
                        }
                        return gameCards;
                    }
                case 2:
                    {
                        // Generate Medium Pack of Pairs : 12 Total
                        for(let i = 0; i < 6; i++)
                        {
                            gameCards.push({
                                emoji: emojiArray[i],
                                isFlipped: false,
                                isPaired: false,
                                isSelected: false,
                                selectCard: () => selectCard
                            })
                        }
                        return gameCards;
                    }
                case 3:
                    {
                        // Generate Hard Pack of Pairs : 18 Total
                        for(let i = 0; i < 9; i++)
                        {
                            gameCards.push({
                                emoji: emojiArray[i],
                                isFlipped: false,
                                isPaired: false,
                                isSelected: false,
                                selectCard: () => selectCard
                            })
                        }
                        return gameCards;
                    }
            }
    
        }
        let uniqueEmojis = generateGameCards();
        let playableDeck : Array<CardProps> = [];
        // Push unique emoji's into deck twice
        let idCounter = 0;
        uniqueEmojis?.forEach((element:CardProps) => {
            playableDeck.push({
                emoji: element.emoji,
                id: idCounter,
                isFlipped: element.isFlipped,
                isPaired: element.isPaired,
                isSelected: element.isSelected,
                selectCard: element.selectCard
            });
            idCounter++;
            playableDeck.push({
                emoji: element.emoji,
                id: idCounter,
                isFlipped: element.isFlipped,
                isPaired: element.isPaired,
                isSelected: element.isSelected,
                selectCard: element.selectCard
            });
            idCounter++;
        });
        // Need to shuffle playable deck...
        playableDeck = knuthShuffle(playableDeck);
        // Set our CardProps array ready to map to UI
        setEmojisInPlay(playableDeck);
        
    }, [props.selectedDifficulty])

    /* DEBUG */
    // useEffect(() => {
    //     console.log(emojisInPlay);
    // }, [emojisInPlay])

    // useEffect(() => {
    //     console.log(selectedCard);
    // }, [selectedCard])
    /* DEBUG END */

    // https://github.com/coolaj86/knuth-shuffle
    // A tried and tested unbiased shuffle algorithm. No need in reinventing the wheel after all
    const knuthShuffle = (array:Array<any>) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while(0 !== currentIndex)
        {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // Swap it with the current element
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const selectCard = (card: CardProps) => {
        var cleanClick = false;
        if(card.isPaired || card.isFlipped || card.isSelected)
        {
            console.log(card)
            return;
        }
        if(!selectedCard)
        {
            card.isFlipped = true;
            card.isSelected = true;
            setSelectedCard(card);
            cleanClick = true;
        }
        else{
            if(selectedCard.emoji === card.emoji)
            {
                card.isFlipped = true;
                card.isPaired = true;
                card.isSelected = false; 
                setSelectedCard(undefined);
                cleanClick = true;
            } 
            else
            {
                card.isFlipped = false;
                card.isPaired = false;
                card.isSelected = false; 
                setSelectedCard(undefined);
            }
        }
        
        if(cleanClick)
        {
            setEmojisInPlay(emojisInPlay => {
                const newEmojisInPlay = emojisInPlay?.map((element) => {
                    if(element.id === card.id)
                    {
                        return card;
                    }
                    else
                    {
                        element.isSelected = false;
                        return element;
                    }
                })
                return newEmojisInPlay;
            })
        }
        else{
            setEmojisInPlay(emojisInPlay => {
                const newEmojisInPlay = emojisInPlay?.map((element) => {
                    if(element.isSelected && !element.isPaired)
                    {
                        element.isSelected = false;
                        element.isFlipped = false;
                        return element;
                    }
                    else
                    {
                        element.isSelected = false;
                        return element;
                    }
                })
                return newEmojisInPlay;
            })
        }
        
    }

    const mapCardsToUI = () => {
        return(
        <>
            <div>
                <button className="Button" onClick={() => props.setDifficultyLevel(Difficulty.None)}>Reset</button>
            </div>
            <div style={{display: "inline-block"}}>
            {emojisInPlay && emojisInPlay.length > 0 && 
                emojisInPlay.map((card) => {
                    return <Card key={card.id} emoji={card.emoji} isFlipped={card.isFlipped} isPaired={card.isPaired} isSelected={card.isSelected} selectCard={() => selectCard(card)}/>
                })
            }
            </div>
        </>
        )
    }

    return (
        <>
            {mapCardsToUI()}
        </>
    )
}

