/**
 * # Game settings definition file
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */

// Copied from StackOverflow:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://en.wikipedia.org/wiki/Schwartzian_transform
const shuffle = (unshuffled) => {
    let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

    return shuffled;
};

// shuffles the array of lists
const shuffleBoard = (boards) => {
    boards.forEach( (board, index) => boards[index] = shuffle(board));
    return boards;
};

// true/false - randomize the words in the lists
const RANDOMIZE_WORD_LISTS = true;

var board0 = ["SMELL","FAMILY","BLOW","AMP","TANK","BIRTHDAY","PUNISHMENT","HELICOPTER","BLAME",
        "FIB","EYES","WEEP","THIRST","FOLLOWER","ANTIDOTE","PIE","BLAZE","LEAP","DATE","NAVY"];
var board1 = ["BENCH","GLOW","SUNNY","IDIOT","QUICK","ANALYZE","BEAM","CAVE","OAK","RED","ROBIN",
    "TREE","FIRM","CUT","RUN","KNIGHT","TRIM","SITE","BIRD","MONTH"];
var board2 = ["PLANT","LACE","TIP","TENT","ARROW","POST","SUN","SILVER","ABOVE","BLUE","HOST","LOOSE",
    "GOLD","STERN","CUP","WIND","BOWL","LUNCH","BELOW","BOW"];
var board3 = ["MILD","SHINE","GRAY","GUMS","LUCK","PAPER","RUDE","LANE","HOLY","ROAD","JAM","HAMMER",
    "REGRET","CHIP","TEETH","FAIRY","TINY","TOOL","BULB","KIND"];
var board4 = ["GUN","HALO","JUMP","GIVE","HOPE","TRAVEL","POOR","DREAM","SPOON","GLUE","ANGEL","WEAK",
    "LEAP","CHIEF","ANKLE","PASTE","USUAL","BET","PATH","FORK"];
var board5 = ["TIGER","EXAM","BUN","TRACE","HAND","STORM","SNAKE","ALARM","BEAR","HOUSE","BIRTH","TEST",
    "DEAD","FRESH","ALIVE","TOWER","PORK","ASH","LION","HELL"];
var board6 = ["SIT","PINE","WHITE","IDEAL","CRUST","FLOUR","ROCK","LEMON","ELM","FOUND","RIVER","LOST",
    "FLAT","CHAIN","FILL","STAND","TEAR","EXACT","BOOT","CLEVER"];
var board7 = ["HEAVY","EAST","WOOD","DIM","NEW","GLASS","HEART","FULL","TIMBER","LOVE","SOFT","METER",
    "EMPTY","HARD","OLD","CAGE","WORN","KITCHEN","SHORT","BOOTS"];
var board8 = ["PEN","LAND","ICING","HAPPY","HORN","DRUM","FLOOR","RIDE","TALL","GIANT","RURAL","FINE",
    "TILE","STYLE","CAKE","SUGAR","ARMY","SAD","SUBTLE","ACRE"];
var board9 = ["MALE","HAPPEN","KING","CANDLE","TOE","HAMMOCK","SILLY","TRAUMA","RAGE","WEIRD","REAL",
    "SLEEP","FLY","WICK","GUEST","ANGER","OLIVE","SKIRT","SORE","LAYER"];
var board10 = ["FEET","CHAIR","FIRE","SHIP","LATE","LIST","GAS","DUNE","SAND","BOSS","TABLE","RING",
    "BLAZE","GARAGE","CHAPEL","EARLY","PURE","DOPE","AWARE","BONE"];
var board11 = ["BEE","CAMEL","SOUR","DAY","MOVE","HELP","JOKE","COAL","SAME","HONEY","SIN","HALF",
    "CORAL","NIGHT","ASSIST","PET","ENVY","LAUGH","WASH","TOAD"];
var board12 = ["TULIP","ZONE","CHALK","FIST","SAFE","PRISON","PAIN","MOVIE","SMILE","PINK","GRASP",
    "TERM","AGONY","LEGAL","BEND","FILM","PAIL","var board","FLOWER","RUBY"];
var board13 = ["ROPE","FOLLOW","PONY","SOLID","TEXT","KNIFE","EAR","BLADE","TEA","SLOW","ART","LEAD",
    "DARE","GIRL","WEST","BOOK","BASE","HORSE","STAB","BOY"];
var board14 = ["TUNA","WET","FLOAT","APPLE","FALL","DUSK","BOX","TALE","SIREN","WALK","EVIL","TOY",
    "DAWN","SUIT","DRY","COLD","LOCAL","DIRTY","HOT","LIAR"];
var board15 = ["HILL","ZOO","TROUT","SALT","SOUTH","CLOTH","FORT","ROW","FISH","BOAT","PLANE","FOUL",
    "ANIMAL","BUTTER","BARK","MAD","ROUGH","PEPPER","GOAL","DAMN"];
var board16 = ["KNOB","ERROR","FLUID","CRIB","PROOF","RETURN","WIDE","PLUM","POWER","LIGHT","BABY",
    "PIER","WORRY","WORKER","DOOR","SMALL","POET","SOBER","LAMP","TASK"];
var board17 = ["TOUGH","KEY","WORST","WAG","BADGE","SOIL","WARM","SHELF","WRITE","CART","GIFT","THREAD",
    "ANGLE","BEST","WOOL","DIRT","TAIL","SAGE","TREAT","SKILL"];
var board18 = ["CREDIT","FROG","MOLE","JUNK","LEASE","GAME","VINE","SHOP","GRAPE","JUICE","SPELL",
    "SPIDER","OAR","JOIN","SKY","CROAK","WRONG","TAN","CARD","FUSE"];

var boards = [board0, board0, board0, board1, board1, board1, board2, board2, board2, board3, 
    board3, board3, board4, board4, board4, board5, board5, board5, board6, board6, board6, 
    board7, board7, board7, board8, board8, board8, board9, board9, board9, board10, board10, 
    board10, board11, board11, board11,
    board12, board12, board12, board13, board13, board13, board14, board14, board14, board15, 
    board15, board15, board16, board16, board16, board17, board17, board17, board18, board18, board18];    

var pair0 = ["BLOW","BLAZE"];
var pair1 = ["SMELL","EYES"];
var pair2 = ["WEEP","FAMILY"];
var pair3 = ["QUICK","GLOW"];
var pair4 = ["TREE","OAK"];
var pair5 = ["CAVE","KNIGHT"];
var pair6 = ["GOLD","SILVER"];
var pair7 = ["SUN","BOWL"];
var pair8 = ["STERN","WIND"];
var pair9 = ["TEETH","GUMS"];
var pair10 = ["HOLY","KIND"];
var pair11 = ["RUDE","REGRET"];
var pair12 = ["JUMP","LEAP"];
var pair13 = ["DREAM","BET"];
var pair14 = ["TRAVEL","ANKLE"];
var pair15 = ["SNAKE","ASH"];
var pair16 = ["LION","TIGER"];
var pair17 = ["HAND","BIRTH"];
var pair18 = ["SIT","STAND"];
var pair19 = ["CRUST","BOOT"];
var pair20 = ["ELM","ROCK"];
var pair21 = ["OLD","NEW"];
var pair22 = ["GLASS","CAGE"];
var pair23 = ["EAST","SHORT"];
var pair24 = ["HAPPY","SAD"];
var pair25 = ["ARMY","DRUM"];
var pair26 = ["GIANT","SUBTLE"];
var pair27 = ["CANDLE","WICK"];
var pair28 = ["OLIVE","REAL"];
var pair29 = ["WEIRD","TRAUMA"];
var pair30 = ["FEET","CHAPEL"];
var pair31 = ["CHAIR","TABLE"];
var pair32 = ["GARAGE","BONE"];
var pair33 = ["BEE","HONEY"];
var pair34 = ["CAMEL","COAL"];
var pair35 = ["SOUR","ENVY"];
var pair36 = ["GRASP","PAIL"];
var pair37 = ["MOVIE","FILM"];
var pair38 = ["RUBY","SAFE"];
var pair39 = ["KNIFE","STAB"];
var pair40 = ["SLOW","SOLID"];
var pair41 = ["BLADE","BASE"];
var pair42 = ["WET","DRY"];
var pair43 = ["LOCAL","TOY"];
var pair44 = ["SIREN","BOX"];
var pair45 = ["FISH","TROUT"];
var pair46 = ["PLANE","GOAL"];
var pair47 = ["BUTTER","FOUL"];
var pair48 = ["SOBER","WIDE"];
var pair49 = ["DOOR","KNOB"];
var pair50 = ["ERROR","POET"];
var pair51 = ["DIRT","SOIL"];
var pair52 = ["SHELF","ANGLE"];
var pair53 = ["BADGE","TREAT"];
var pair54 = ["FROG","CROAK"];
var pair55 = ["JUICE","JUNK"];
var pair56 = ["SPIDER","JOIN"];

module.exports = {

    // Variables shared by all treatments.
    // #nodeGame properties:
    MIN_PLAYERS: 2,
    WAIT_TIME: 3000,
    WAIT_TIME_TEXT: "Please wait for your partner to reconnect",

    /**
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    // TIMER: {
    //      consent: 300000,
    //      idGet: 120000,
    //      instructions: 300000,
    //      clueOptionsprac: 180000,
    //      clueFinalprac: 60000,
    //      guessOptionsprac: 180000,
    //      guessFinalprac: 60000,
    //      feedbackprac: 60000,
    //      endprac: 120000,
    //      clueOptions: 180000,
    //      clueFinal: 60000,
    //      guessOptions: 180000,
    //      guessFinal: 60000,
    //      feedback: 60000
    // },

    // # Game specific properties

    // Number of game rounds repetitions.
    REPEAT: 1,

    // In case an incoming offer does not pass validation, which indicates
    // cheating, re-set the dictator's offer to this value.
    defaultOffer: 100,

    boardboard: RANDOMIZE_WORD_LISTS ? shuffleBoard(boards): boards,

    pairList: [pair0,pair1,pair2,pair3,pair4,pair5,pair6,pair7,pair8,pair9,pair10,pair11,pair12,
        pair13,pair14,pair15,pair16,pair17,pair18,pair19,pair20,pair21,pair22,pair23,pair24,pair25,
        pair26,pair27,pair28,pair29,pair30,pair31,pair32,pair33,pair34,pair35,pair36,pair37,pair38,
        pair39,pair40,pair41,pair42,pair43,pair44,pair45,pair46,pair47,pair48,pair49,pair50,pair51,
        pair52,pair53,pair54,pair55,pair56],

    pairnumber: 33, // the number of pairs in the total experiment, should be 57
    pracpairnumber: 3,
    BOARD_DIMENSIONS: {x: 5, y: 4},

    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        standard: {
            description: "Longer time",
            bidTime: 30000
        },
/*
        pressure: {
            description: "Short times to take decisions",
            bidTime: 10000
        },

        //new treatments
        rich: {
            description: "Wealthy",
            coins: 1000,
            TEXT: "you are rich now"
        },
*/
    }
};
