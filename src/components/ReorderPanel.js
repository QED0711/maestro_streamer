import React, { useContext } from 'react'
import { mainContext } from '../state/main/mainProvider';

const ReorderPanel = () => {


    const {state, setters} = useContext(mainContext)

    // HELPERS
    const renderPanelOrder = streams => {

        return streams.map((stream, i) => {
            let name;
            try{
                name = document.getElementById(`name-${stream.id}`).innerText
            } catch(err){
                name = ""
            }

            name = !!name.length ? name : "--"
            return (
                <div key={stream.id} className="stream-order-box">
                    <label>{name} </label>
                    <input className="order-number" type="number" defaultValue={i + 1} data-id={stream.id} min="1" max={streams.length} />
                </div>
            )
        })

    }

    // EVENTS
    const handleSubmit = e => {
        e.preventDefault()

        const orderNums = [...document.getElementsByClassName('order-number')]
        let newOrder = []
        for(let el of orderNums){
            newOrder.push([
                parseInt(el.value),
                el.dataset.id
            ])
        }

        newOrder = newOrder.sort((a, b) => a[0] - b[0])

        setters.setStreamOrder(newOrder);
    }

    return (
        <>
        <form id="reorder-panel" onSubmit={handleSubmit}>
            <h3>Reorder Videos</h3>
            {renderPanelOrder(state.streams)}
            <br/>
            <input type="submit" value="Reorder"/>
        </form>
        <hr/>
        </>
    )

}

export default ReorderPanel;