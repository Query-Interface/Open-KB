import * as React from 'react';
import { CardProps } from './Board';
//import { DataSource } from '../../services/DataSource';

export class Card extends React.Component<CardProps> {

    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return <div className="card-details" key={this.props.id}>
                <div>{this.props.title}</div>
            </div>;
    }
}
