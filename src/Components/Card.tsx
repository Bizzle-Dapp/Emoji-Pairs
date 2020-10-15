import React from 'react';
import '../App.css';

export interface CardProps {
    id?: number,
    emoji: string,
    isFlipped: boolean,
    isPaired: boolean,
    isSelected: boolean,
    selectCard(cardProps : CardProps): void,
}


const flippedAppearance = () => {
    return '❔'
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
    return (
        
        <>
        {props.isFlipped && 
            <>
            {props.isSelected && 
                <button className="Button App-card App-card-selected" onClick={() => props.selectCard(props)}> 
                    {props.emoji}
                </button>
            }
            {!props.isSelected && 
                <button className="Button App-card" onClick={() => props.selectCard(props)}>
                    {props.emoji}
                </button>
            }
            </>
        }
        {!props.isFlipped && !props.isPaired &&
            <button className="Button App-card" onClick={() => {props.selectCard(props)}}>
                {flippedAppearance()}
            </button>
        }
        </>
        
    )
}

Card.defaultProps = {
    id: 0
}
