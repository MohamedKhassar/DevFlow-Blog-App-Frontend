import { useState } from 'react'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
interface ReadMoreProps {
    id: string
    text: string
    amountOfWords?: number
    className?: string  // optional className for the p tag. Default is empty string.  // optional amountOfWords prop. Default is 36.  // optional className prop. Default is empty string.  // optional id prop. Default is a unique id.  // optional text prop. Default is a string.  // optional isExpanded prop. Default is false.  // optional splittedText prop. Default is an array of words from the text prop.  // optional itCan
}

export const ReadMore = ({ id, text, amountOfWords = 36, className }: ReadMoreProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const splittedText = text.split(' ')
    const itCanOverflow = splittedText.length > amountOfWords
    const beginText = itCanOverflow
        ? splittedText.slice(0, amountOfWords - 1).join(' ')
        : text
    const endText = splittedText.slice(amountOfWords - 1).join(' ')


    return (
        <p id={id} className={className}>

            {beginText}
            {itCanOverflow && (
                <>
                    <AnimatePresence>
                        {
                            !isExpanded &&
                            <motion.span
                                initial={{ display: "inline" }}
                                animate={isExpanded && { display: "none" }}
                                transition={{ duration: 0.3 }}
                            >... </motion.span>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            isExpanded &&
                            <motion.span
                                key="endText"
                                initial={{ opacity: 0 }}
                                animate={isExpanded && { opacity: 1 }}
                                transition={{ duration: 0.3 }}


                                className={`${!isExpanded && 'hidden'}`}
                                aria-hidden={!isExpanded}
                            >
                                {" " + endText}
                            </motion.span>
                        }
                    </AnimatePresence>
                    <span
                        className='text-violet-400 my-2 flex w-fit capitalize duration-300'
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-controls={id}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? <span className='flex items-center gap-x-1'>show less <BsArrowUpCircle className='size-4' /></span> : <span className='flex items-center gap-x-1'>show more<BsArrowDownCircle className='size-4' /></span>}
                    </span>
                </>
            )}        </p>
    )
}