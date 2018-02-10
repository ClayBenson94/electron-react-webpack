import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Link from './components/Link.jsx'
import { List } from 'material-ui/List'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const fs = require('fs');
const NUM_OF_LOG_ITEMS_SHOWN = 10;
const NUM_OF_LOG_ITEMS_TOTAL = 30;

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            numToShow: NUM_OF_LOG_ITEMS_SHOWN
        };
    }

    componentDidMount() {
        setInterval(() => {
            fs.readFile('C:\\Users\\pierc\\AppData\\LocalLow\\Facepunch Studios LTD\\Rust\\output_log.txt', 'utf8', (err, fileData) => {
                const lastIndex = fileData.lastIndexOf('time   attacker id     target           id');
                const slicedString = fileData.slice(lastIndex, fileData.length);
                const lines = slicedString.split('\n');
                const allLogItems = lines.slice(0, NUM_OF_LOG_ITEMS_TOTAL+1);
                const showLogItems = allLogItems.slice(Math.max(allLogItems.length - this.state.numToShow, 1))
                const finalData = showLogItems.map((row) => {
                    const rowData = row.replace(/ +(?= )/g, '').trim();

                    const splitRowData = rowData.split(' ');
                    const item = {
                        time: splitRowData[0],
                        attacker: splitRowData[1],
                        target: splitRowData[3],
                        weapon: splitRowData[5],
                        ammo: splitRowData[6],
                        area: splitRowData[7],
                        disatance: splitRowData[8],
                        oldHp: splitRowData[9],
                        newHp: splitRowData[10],
                        info: splitRowData[11]
                    };
                    return item;
                });
                this.setState({
                    data: finalData
                })
            });
        }, 1000);
    }

    render() {

        return (
            <div>
                <div style={{height: '25vh'}} className="headerInfo">
                    <img width="10%" src="./src/assets/rust.jpg" />
                    <h1>Rust Combat Log</h1>
                </div>
                <div>
                    <button onClick={() => { this.setState({ numToShow: Math.max(10,this.state.numToShow - 1) }) }}>-</button> {this.state.numToShow} <button onClick={() => { this.setState({ numToShow: Math.min(30,this.state.numToShow + 1) }) }}>+</button>
                </div>
                <div style={{height: '65vh',overflowY: 'auto'}}>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Time</TableHeaderColumn>
                                <TableHeaderColumn>Attacker</TableHeaderColumn>
                                <TableHeaderColumn>Target</TableHeaderColumn>
                                <TableHeaderColumn>Weapon</TableHeaderColumn>
                                <TableHeaderColumn>Ammo</TableHeaderColumn>
                                <TableHeaderColumn>Area</TableHeaderColumn>
                                <TableHeaderColumn>Disatance</TableHeaderColumn>
                                <TableHeaderColumn>Old HP</TableHeaderColumn>
                                <TableHeaderColumn>New HP</TableHeaderColumn>
                                <TableHeaderColumn>Damage Done</TableHeaderColumn>
                                <TableHeaderColumn>Info</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            {this.state.data.map((item, idx) => {
                                return (
                                    <TableRow key={`tablerow_${idx}`}>
                                        <TableRowColumn>{item.time}</TableRowColumn>
                                        <TableRowColumn>{item.attacker}</TableRowColumn>
                                        <TableRowColumn>{item.target}</TableRowColumn>
                                        <TableRowColumn>{item.weapon}</TableRowColumn>
                                        <TableRowColumn>{item.ammo}</TableRowColumn>
                                        <TableRowColumn>{item.area}</TableRowColumn>
                                        <TableRowColumn>{item.disatance}</TableRowColumn>
                                        <TableRowColumn>{item.oldHp}</TableRowColumn>
                                        <TableRowColumn>{item.newHp}</TableRowColumn>
                                        <TableRowColumn>{(item.oldHp - item.newHp).toPrecision(3)}</TableRowColumn>
                                        <TableRowColumn>{item.info === 'killed' ? <img style={{height: '100%'}} src='./src/assets/skull.png'/> : item.info}</TableRowColumn>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}
