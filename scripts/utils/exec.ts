import ChildProcess from 'child_process';
import util from 'util';

const exec = util.promisify(ChildProcess.exec);

export default exec;
