declare const process: any;
declare const require: any;
process.argv.slice(2).forEach(s => require(s))


