import { warn } from 'console'
import winston from 'winston'

const levels = {

    error: 0,
    warn: 1,
    info: 2,
    htpp: 3,
    debug: 4

}

const level = () => {
    return 'debug'
}


const colors ={
    error: 'red',
    warn: 'yellow',
    info: 'green',
    htpp: 'magenta',
    debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    winston.format.colorize({all:true}),
    winston.format.printf(
        (info)=> `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transports =[
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level:'error'
    }),

    new winston.transports.File(
        {filename: 'logs/all.log'})

]

const Logeer = winston.createLogger({
    level: level(),
    levels,
    format,
    transports

})


export default Logeer