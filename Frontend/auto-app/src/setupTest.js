import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
//expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));enzyme-adapter-react-16
//window.SVGPathElement = jest.fn();
// global.fetch = require('jest-fetch-mock');