import React from 'react';

const RatingCard = (props) =>{
    const {value} = props;
    return (
        <>
        {
            value.hasOwnProperty('cr') || value.hasOwnProperty('ct') || value.hasOwnProperty('dir') || value.hasOwnProperty('gn') || value.hasOwnProperty('du') ?
                <table className="movie-review-tbl" cellPadding="0" cellSpacing="0">
                    <tbody>
                        {value.hasOwnProperty('ct') && value.ct!=""?
                            <tr>
                                <td className="titleTd">
                                Cast
                                </td>
                                <td>
                                {value.ct}
                                </td>
                            </tr>
                            :null
                        } 

                        {value.hasOwnProperty('dir') && value.dir!=""?
                            <tr>
                                <td className="title">
                                Director
                                </td>
                                <td>
                                {value.dir}
                                </td>
                            </tr>
                            :null
                        }
                        {value.hasOwnProperty('gn') && value.gn!=""?
                            <tr>
                                <td className="title">
                                Genre
                                </td>
                                <td>
                                {value.gn}
                                </td>
                            </tr>
                            :null
                        }
                        {value.hasOwnProperty('du') && value.du!=""?
                            <tr>
                                <td className="title">
                                Duration
                                </td>
                                <td>
                                {convertTime(value.du)}
                                </td>
                            </tr>
                            :null
                        }    
                    </tbody>      
                </table>
            :null
        }
        </>
    )
}

export default RatingCard;