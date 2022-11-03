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

    board0: ["SMELL","FAMILY","BLOW","AMP","TANK","BIRTHDAY","PUNISHMENT","HELICOPTER","BLAME",
        "FIB","EYES","WEEP","THIRST","FOLLOWER","ANTIDOTE","PIE","BLAZE","LEAP","DATE","NAVY"],
    board1: ["BENCH","GLOW","SUNNY","IDIOT","QUICK","ANALYZE","BEAM","CAVE","OAK","RED","ROBIN",
        "TREE","FIRM","CUT","RUN","KNIGHT","TRIM","SITE","BIRD","MONTH"],
    board2: ["PLANT","LACE","TIP","TENT","ARROW","POST","SUN","SILVER","ABOVE","BLUE","HOST","LOOSE",
        "GOLD","STERN","CUP","WIND","BOWL","LUNCH","BELOW","BOW"],
    board3: ["MILD","SHINE","GRAY","GUMS","LUCK","PAPER","RUDE","LANE","HOLY","ROAD","JAM","HAMMER",
        "REGRET","CHIP","TEETH","FAIRY","TINY","TOOL","BULB","KIND"],
    board4: ["GUN","HALO","JUMP","GIVE","HOPE","TRAVEL","POOR","DREAM","SPOON","GLUE","ANGEL","WEAK",
        "LEAP","CHIEF","ANKLE","PASTE","USUAL","BET","PATH","FORK"],
    board5: ["TIGER","EXAM","BUN","TRACE","HAND","STORM","SNAKE","ALARM","BEAR","HOUSE","BIRTH","TEST",
        "DEAD","FRESH","ALIVE","TOWER","PORK","ASH","LION","HELL"],
    board6: ["SIT","PINE","WHITE","IDEAL","CRUST","FLOUR","ROCK","LEMON","ELM","FOUND","RIVER","LOST",
        "FLAT","CHAIN","FILL","STAND","TEAR","EXACT","BOOT","CLEVER"],
    board7: ["HEAVY","EAST","WOOD","DIM","NEW","GLASS","HEART","FULL","TIMBER","LOVE","SOFT","METER",
        "EMPTY","HARD","OLD","CAGE","WORN","KITCHEN","SHORT","BOOTS"],
    board8: ["PEN","LAND","ICING","HAPPY","HORN","DRUM","FLOOR","RIDE","TALL","GIANT","RURAL","FINE",
        "TILE","STYLE","CAKE","SUGAR","ARMY","SAD","SUBTLE","ACRE"],
    board9: ["MALE","HAPPEN","KING","CANDLE","TOE","HAMMOCK","SILLY","TRAUMA","RAGE","WEIRD","REAL",
        "SLEEP","FLY","WICK","GUEST","ANGER","OLIVE","SKIRT","SORE","LAYER"],
    board10: ["FEET","CHAIR","FIRE","SHIP","LATE","LIST","GAS","DUNE","SAND","BOSS","TABLE","RING",
        "BLAZE","GARAGE","CHAPEL","EARLY","PURE","DOPE","AWARE","BONE"],
    board11: ["BEE","CAMEL","SOUR","DAY","MOVE","HELP","JOKE","COAL","SAME","HONEY","SIN","HALF",
        "CORAL","NIGHT","ASSIST","PET","ENVY","LAUGH","WASH","TOAD"],
    board12: ["TULIP","ZONE","CHALK","FIST","SAFE","PRISON","PAIN","MOVIE","SMILE","PINK","GRASP",
        "TERM","AGONY","LEGAL","BEND","FILM","PAIL","BOARD","FLOWER","RUBY"],
    board13: ["ROPE","FOLLOW","PONY","SOLID","TEXT","KNIFE","EAR","BLADE","TEA","SLOW","ART","LEAD",
        "DARE","GIRL","WEST","BOOK","BASE","HORSE","STAB","BOY"],
    board14: ["TUNA","WET","FLOAT","APPLE","FALL","DUSK","BOX","TALE","SIREN","WALK","EVIL","TOY",
        "DAWN","SUIT","DRY","COLD","LOCAL","DIRTY","HOT","LIAR"],
    board15: ["HILL","ZOO","TROUT","SALT","SOUTH","CLOTH","FORT","ROW","FISH","BOAT","PLANE","FOUL",
        "ANIMAL","BUTTER","BARK","MAD","ROUGH","PEPPER","GOAL","DAMN"],
    board16: ["KNOB","ERROR","FLUID","CRIB","PROOF","RETURN","WIDE","PLUM","POWER","LIGHT","BABY",
        "PIER","WORRY","WORKER","DOOR","SMALL","POET","SOBER","LAMP","TASK"],
    board17: ["TOUGH","KEY","WORST","WAG","BADGE","SOIL","WARM","SHELF","WRITE","CART","GIFT","THREAD",
        "ANGLE","BEST","WOOL","DIRT","TAIL","SAGE","TREAT","SKILL"],
    board18: ["CREDIT","FROG","MOLE","JUNK","LEASE","GAME","VINE","SHOP","GRAPE","JUICE","SPELL",
        "SPIDER","OAR","JOIN","SKY","CROAK","WRONG","TAN","CARD","FUSE"],

    boardboard: [this.board0, this.board0, this.board0, this.board1, this.board1, this.board1, this.board2, this.board2, this.board2, this.board3, 
        this.board3, this.board3, this.board4, this.board4, this.board4, this.board5, this.board5, this.board5, this.board6, this.board6, this.board6, 
        this.board7, this.board7, this.board7, this.board8, this.board8, this.board8, this.board9, this.board9, this.board9, this.board10, this.board10, 
        this.board10, this.board11, this.board11, this.board11,
        this.board12, this.board12, this.board12, this.board13, this.board13, this.board13, this.board14, this.board14, this.board14, this.board15, 
        this.board15, this.board15, this.board16, this.board16, this.board16, this.board17, this.board17, this.board17, this.board18, this.board18, this.board18],

    pair0: ["BLOW","BLAZE"],
    pair1: ["SMELL","EYES"],
    pair2: ["WEEP","FAMILY"],
    pair3: ["QUICK","GLOW"],
    pair4: ["TREE","OAK"],
    pair5: ["CAVE","KNIGHT"],
    pair6: ["GOLD","SILVER"],
    pair7: ["SUN","BOWL"],
    pair8: ["STERN","WIND"],
    pair9: ["TEETH","GUMS"],
    pair10: ["HOLY","KIND"],
    pair11: ["RUDE","REGRET"],
    pair12: ["JUMP","LEAP"],
    pair13: ["DREAM","BET"],
    pair14: ["TRAVEL","ANKLE"],
    pair15: ["SNAKE","ASH"],
    pair16: ["LION","TIGER"],
    pair17: ["HAND","BIRTH"],
    pair18: ["SIT","STAND"],
    pair19: ["CRUST","BOOT"],
    pair20: ["ELM","ROCK"],
    pair21: ["OLD","NEW"],
    pair22: ["GLASS","CAGE"],
    pair23: ["EAST","SHORT"],
    pair24: ["HAPPY","SAD"],
    pair25: ["ARMY","DRUM"],
    pair26: ["GIANT","SUBTLE"],
    pair27: ["CANDLE","WICK"],
    pair28: ["OLIVE","REAL"],
    pair29: ["WEIRD","TRAUMA"],
    pair30: ["FEET","CHAPEL"],
    pair31: ["CHAIR","TABLE"],
    pair32: ["GARAGE","BONE"],
    pair33: ["BEE","HONEY"],
    pair34: ["CAMEL","COAL"],
    pair35: ["SOUR","ENVY"],
    pair36: ["GRASP","PAIL"],
    pair37: ["MOVIE","FILM"],
    pair38: ["RUBY","SAFE"],
    pair39: ["KNIFE","STAB"],
    pair40: ["SLOW","SOLID"],
    pair41: ["BLADE","BASE"],
    pair42: ["WET","DRY"],
    pair43: ["LOCAL","TOY"],
    pair44: ["SIREN","BOX"],
    pair45: ["FISH","TROUT"],
    pair46: ["PLANE","GOAL"],
    pair47: ["BUTTER","FOUL"],
    pair48: ["SOBER","WIDE"],
    pair49: ["DOOR","KNOB"],
    pair50: ["ERROR","POET"],
    pair51: ["DIRT","SOIL"],
    pair52: ["SHELF","ANGLE"],
    pair53: ["BADGE","TREAT"],
    pair54: ["FROG","CROAK"],
    pair55: ["JUICE","JUNK"],
    pair56: ["SPIDER","JOIN"],

    pairList: [this.pair0,this.pair1,this.pair2,this.pair3,this.pair4,this.pair5,this.pair6,this.pair7,this.pair8,this.pair9,this.pair10,this.pair11,this.pair12,
        this.pair13,this.pair14,this.pair15,this.pair16,this.pair17,this.pair18,this.pair19,this.pair20,this.pair21,this.pair22,this.pair23,this.pair24,this.pair25,
        this.pair26,this.pair27,this.pair28,this.pair29,this.pair30,this.pair31,this.pair32,this.pair33,this.pair34,this.pair35,this.pair36,this.pair37,this.pair38,
        this.pair39,this.pair40,this.pair41,this.pair42,this.pair43,this.pair44,this.pair45,this.pair46,this.pair47,this.pair48,this.pair49,this.pair50,this.pair51,
        this.pair52,this.pair53,this.pair54,this.pair55,this.pair56],

    pairnumber: 33, // the number of pairs in the total experiment, should be 57
    pracpairnumber: 3,

    randomizeWords: false, // true/false - randomize order of words on the board

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
