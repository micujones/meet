import { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.bgColor = null;
    }

    getStyle = () => {
        return {
            color: '#fff',
            backgroundColor: this.bgColor,
            borderWidth: '0px',
            borderStyle: 'solid',
            fontWeight: 'bolder',
            borderRadius: '7px',
            textAlign: 'center',
            fontSize: '12px',
            margin: '10px 0',
            padding: '10px',
        };
    };

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        // this.color = 'rgb(0, 0, 255)';
        this.bgColor = 'rgb(26, 156, 192)';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        // this.color = 'rgb(255, 0, 0)';
        this.bgColor = 'rgb(209, 30, 53)';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        // this.color = 'rgb(250, 220, 10)';
        this.bgColor = 'rgb(254, 181, 13)';
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };
