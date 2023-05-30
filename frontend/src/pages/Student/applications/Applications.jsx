    import React from "react";
import SingleApp from "./SingleApp";


export default function Applications() {

    return (
        <div className='whole-container'>

            <h5>Clearance Applications</h5>

            <table className="table table-hover table-colored">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    <SingleApp id={`000001`} status={`Pending`} />
                    <SingleApp id={`000002`} status={`Cleared`} />
                    <SingleApp id={`000003`} status={`Closed`} />
                </tbody>
            </table>
        </div>
    );
}