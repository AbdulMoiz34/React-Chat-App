import { Scrollbar } from 'react-scrollbars-custom';
import MessageBox from './MessageBox';
import { useEffect, useRef } from 'react';

const Middle = () => {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <Scrollbar>
            <div className="flex-10 py-3 px-2 overflow-auto flex flex-col gap-6 ">
                <MessageBox message='Hello' />
                <MessageBox message='Who are you?' type="mine" />
                <MessageBox message="I'm fine" />
                <MessageBox message="I'm okay." />
                <MessageBox message="I'm absolutely fine." />
                <MessageBox message="ok." />
                <MessageBox type="mine" message='end message Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sed tempore magnam. Aliquid assumenda iure, iste exffffffffffffffffffffffff' />
                <div ref={endRef}></div>
            </div>
        </Scrollbar>
    )
}

export default Middle;