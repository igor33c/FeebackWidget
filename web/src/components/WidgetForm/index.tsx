import { CloseButton } from "../CloseButton";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

import bugImageUrl from '../../assets/Bug.svg'
import IdeaImageUrl from '../../assets/Idea.svg'
import outroImageUrl from '../../assets/Thought.svg'
import { useState } from "react";
import { FeedbackTypeContentStep } from "./Steps/FeedbackTypeContent";
import { FeedbackTypeSucess } from "./Steps/FeedbackTypeSuccess";

export const feedbackTypes = {
    Bug:{
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt:'imagem de Inseto '
        },
    },
    Idea:{
        title: 'Ideia',
        image: {
            source: IdeaImageUrl,
            alt: 'imagem de uma lampada'
        },
    },
    Other:{
        title: 'Outros',
        image:{
            source: outroImageUrl,
            alt: 'imagem aleatoria'
        },
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
   
    const [feedbackType, setFeedbackType]= useState<FeedbackType | null>(null)   
    const [feedbackSent, setFeedbackSent] = useState(false) 
    function handleRestartFeedback(){ 
        setFeedbackSent(false);       
        setFeedbackType(null);    
        console.log('foi')    
    }
    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ? (
                <FeedbackTypeSucess onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackChanged={setFeedbackType}/>
                    ) : <FeedbackTypeContentStep 
                    feedbackType={ feedbackType }
                    onFeedbackRestartRequested={handleRestartFeedback}
                    onFeedbackSent={() => setFeedbackSent(true)}  
                    ///aqui vamos pra funcao handle recebendo dado da feed,..content            
                    />
                    }                
                </>
            )  
            }   

            
            

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2"href="https://rocketseat.com.br">RocketSeat</a>
            </footer>
        </div>
        ///tailwind faz essa funcao w-[calc(100vw-2rem)] é necessario usar vw para viewport no componente a ser desejado o tamanho
        ///que o componente se altere, e nao no componente principal md: para telas maiores
    ) 
}