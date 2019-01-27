import * as React from 'react';
import { BoardProps, ListProps } from './Board';
import { DataSource } from '../../services/DataSource';

interface BoardState {
    lists: Array<ListProps>
}

export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            lists : []
        };
    }

    componentDidMount() {
        DataSource.getLists(this.props.id).then(
            value => this.setState({ lists : value}));
    }
}
