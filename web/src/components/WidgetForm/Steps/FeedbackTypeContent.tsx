import React, { FormEvent, useState } from "react";
import {ArrowLeft, Camera} from "phosphor-react"
import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../lib/api";
import { Loading } from "../Loading";

interface FeedbackTypeContentStepProps {
    feedbackType: FeedbackType;    
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;     
}   
export function FeedbackTypeContentStep( {feedbackType, 
    onFeedbackRestartRequested, onFeedbackSent
    } : FeedbackTypeContentStepProps){
    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault()///evita que atualize
        setSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        setSendingFeedback(false)
        onFeedbackSent()    
    }
    

    const [screenshot, setScreenshotTook,] = useState<string | null> (null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    ///feedbacktypeinfo nova const recebe array de types feedbacke e objeto clicado
    return(
        <>
            <header>
                <button type='button' onClick={onFeedbackRestartRequested}>
                    <ArrowLeft weight='bold' className='w-4 h-4 left-5 absolute text-zinc-400 hover:text-violet-500' />
                    
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt= {feedbackTypeInfo.image.alt} className="w-6 h-6" />                
                    {feedbackTypeInfo.title}   
                </span>
                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                    placeholder="Deixe um comentario"
                    onChange={event => setComment(event.target.value)}/// trara o texto da txt area e atualiazar
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}                         
                        onScreenshotTook={setScreenshotTook}
                    />
                    <button
                        type="submit"
                        disabled={comment.length == 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset focus:ring-offset-zinc-700 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >   {isSendingFeedback ? <Loading /> :  'Enviar Feedback'}
                    </button>
                </footer>
                
            </form>
        </>

    )
}
