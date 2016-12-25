'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd/lib/pagination/style/css');

var _pagination = require('antd/lib/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _css2 = require('antd/lib/table/style/css');

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = function fetch(page, size, condition) {
    return new Promise(function (resolve, reject) {
        resolve({
            rows: [],
            count: 0
        });
    });
};

var Datagrid = _react2.default.createClass({
    displayName: 'Datagrid',


    getDefaultProps: function getDefaultProps() {
        return {
            columns: [],
            onRowClick: function onRowClick(record, index) {},
            fetch: fetch,
            condition: {}
        };
    },

    getInitialState: function getInitialState() {
        return { dataSource: [], total: 0, size: 5, current: 1 };
    },

    componentDidMount: function componentDidMount() {
        this.fetchAndSetState(this.state.current, this.state.size, {});
    },

    fetchAndSetState: function fetchAndSetState(page, size, condition) {
        var _this = this;

        this.props.fetch(page, size, condition).then(function (info) {
            _this.setState({
                dataSource: info.rows,
                total: info.count,
                current: page
            });
        });
    },

    render: function render() {
        var _this2 = this;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_table2.default, { dataSource: this.state.dataSource, columns: this.props.columns, onRowClick: this.props.onRowClick, pagination: false }),
            _react2.default.createElement(_pagination2.default, { total: this.state.total, pageSize: this.state.size, current: this.state.current,
                onChange: function onChange(page) {
                    _this2.setState({ current: page }, function () {
                        _this2.fetchAndSetState(page, _this2.state.size, _this2.props.condition);
                    });
                }
            })
        );
    }
});

exports.default = Datagrid;