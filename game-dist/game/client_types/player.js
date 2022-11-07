/**
 * # Player type implementation of the game stages
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";




module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            return node.JSUS.isInt(n, -1, 101);
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();


        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);

        //this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header);

        this.inArrayCaseInsensitive = function(needle, haystackArray){
            //Iterates over an array of items to return the index of the first item that matches the provided val ('needle') in a case-insensitive way.  Returns -1 if no match found.
            var defaultResult = false;
            var result = defaultResult;
            var i;
            for(i = 0; i<haystackArray.length; i++){
                if (result == defaultResult && haystackArray[i].toLowerCase() == needle.toLowerCase()) {
                    result = true;
                }
            }
            return result;
        };

        // event listener to record button presses of game board
        this.guessClickHandler = function (e) {
            var tableCell = e.target;
            
            if (tableCell.nodeName == 'TD' && tableCell.innerText) {
                var guessListDiv = W.getElementById("glist");
                
                guessListDiv.innerHTML = guessListDiv.innerText + tableCell.innerText + ", ";
                node.game.doneButton.enable();

                node.game.memory.add({
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    GuessOptions: tableCell.innerText,
                    GUESS_OPTIONS_TIME: node.timer.getTimeSince('step'),
                    customTimeStamp: node.timer.getTimeSince('start')
                });
            }

        };

        //event listener that receives two words and then ends the step
        this.guessClickHandler2 = function (e) {
            var target = e.target;

            node.log('Target ' + target.nodeName + ', text: ' + target.innerText);
            
            if (target.nodeName == 'TD' && target.innerText) {
                var myDiv = W.getElementById("alist");
                node.log('Final answer text: ' + myDiv.innerText);
                
                
                if(myDiv.innerText.trim() == "Your final answers:"){//the condition if no word has been added, stores the first word and sends it to the partner
                    node.log('Capturing first guess ...');
                    myDiv.innerText = myDiv.innerText + target.innerText;
                    node.say('GUESS1', node.game.partner, target.innerText);
                    node.set({GUESS_1_FINAL : target.innerText});
                    node.set({GUESS_1_FINAL_TIME : node.timer.getTimeSince('step')})
                    node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                        player: node.player.id,
                        stage: node.game.getCurrentGameStage(),
                        Guess1: target.innerText
                    });
                    node.game.memory.tag("guess1");//tag this memory for easy access later

                }
                else if(!myDiv.innerText.includes(",")) {//the condition if 1 word has been added, stores the second word, send it to the partner, and ends the step for both players
                    node.log('Capturing second guess ...');
                    myDiv.innerText = myDiv.innerText + ", " + target.innerText;
                    node.say('GUESS2', node.game.partner, target.innerText);
                    node.set({GUESS_2_FINAL : target.innerText});
                    node.set({GUESS_2_FINAL_TIME : node.timer.getTimeSince('step')})
                    node.game.memory.add({
                        player: node.player.id,
                        stage: node.game.getCurrentGameStage(),
                        Guess2: target.innerText
                    });
                    node.game.memory.tag("guess2");
                    e.currentTarget.removeEventListener('click', node.game.guessClickHandler2);
                    node.done();

                }
            }

        };

        this.buildGrid = (tableId, roundCounter) => {
            // clear the table rows
            var table = W.getElementById(tableId);
            table.replaceChildren();

            var gridCounter = 0;
            // add table rows and populate from board array
            for(let y=0; y < node.game.settings.BOARD_DIMENSIONS.y; y++) {
                var row = table.insertRow(y);
                for(let x=0; x < node.game.settings.BOARD_DIMENSIONS.x; x++) {
                    var cell = row.insertCell(x);

                    if (node.game.settings.boardboard[roundCounter].length > gridCounter) {
                        var word = node.game.settings.boardboard[roundCounter][gridCounter];
                        cell.innerText = word;
                    }

                    gridCounter = gridCounter + 1;
                }
            };
        };

        this.clueValidation = (value) => {
            var res;
            res = { value: value };
            // Custom validation (only reports about last word).

            if (node.game.inArrayCaseInsensitive(value, node.game.settings.boardboard[node.game.roundCounter])) {
                res.err = 'You have used a forbidden word: ' + value;
            }
            return res;
        };

        this.cluespast = [];

        this.roundCounter = 0;//iterated value to move through the word pairs
        this.smallRoundCounter = 0;//iterated value to record the 3 trials for each word pair
        this.optionTimeArray = [0];
        this.id;
        this.randomCode;
        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver

    });

    stager.extendStep('consent', {
        frame: 'consent.htm',
        donebutton: false,
        cb: function(){
            var a = W.gid('agree');
            a.onclick = function() { node.game.doneButton.enable() };
       }
    });

    stager.extendStep('idGet', {
        frame: 'idGet.htm',
        cb: function(){
            this.randomCode = Math.floor(Math.random() * 90000) + 10000;

            this.idWid = node.widgets.append('CustomInput', W.gid('container'), {//apend customInput widget with 1 mandatory input
               id: 'clueGive',
               //mainText: 'What is your final clue?',
               type: 'int',
               className: 'centered',
               //root: 'cbrd',
               requiredChoice: true
           });
       },
        done: function() {//send clue to other player and clue and time info to database
            this.id = this.idWid.getValues().value;
            return;
        }
    });

    stager.extendStep('instructions', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'instructionsCG.htm',
            },
            GUESSER:{
                frame: 'instructions.htm',
            }
        }
    });

    const clueFinalStageParams = {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'clueboard.htm',
                cb: function() {
                    W.setInnerHTML('containerbottom2', "Please type your FINAL clue below and click Done:");

                    node.game.buildGrid('cbrd', this.roundCounter);
                    
                    W.setInnerHTML('trgtWords', node.game.settings.pairList[this.roundCounter][this.randomOrder] + 
                        " and " + node.game.settings.pairList[this.roundCounter][1-this.randomOrder]);
                    
                        node.set({target1: node.game.settings.pairList[this.roundCounter][this.randomOrder]});
                    node.set({target2: node.game.settings.pairList[this.roundCounter][1-this.randomOrder]});

                    //This is the final clue 
                    this.clueGive2 = node.widgets.append('CustomInput', W.gid('containerbottom2'), {//apend customInput widget with 1 mandatory input
                       id: 'clueGive',
                       //mainText: 'What is your final clue?',
                       type: 'text',
                       className: 'centered',
                       root: 'cbrd',
                       requiredChoice: true,
                       validation: node.game.clueValidation,
                       oninput: function(res, input, that) {
                           that.validation(res, input);
                       }
                   });
                },
                done: function() {//send clue to other player and clue and time info to database
                    this.cluespast.push(this.clueGive2.getValues().value);

                    node.say('CLUE', node.game.partner, this.clueGive2.getValues().value);

                    node.set({clueFinal : this.clueGive2.getValues().value});
                    node.set({TBFinal : this.clueGive2.getValues().timeBegin});
                    node.set({TEFinal : this.clueGive2.getValues().timeEnd});

                    return;
                }

            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,
                frame: 'studyboard.htm',

                cb: function() {

                    node.game.buildGrid('sbrd', this.roundCounter);


                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('CLUE', function(msg) {
                        that.clueReceived = msg.data;
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });
                },
            }
        }
    };

    stager.extendStep('clueFinalprac', clueFinalStageParams);

    const guessOptionsStepParams = {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {
                    
                    node.game.buildGrid('sbrd', this.roundCounter);

                    var that;
                    
                    //force proceed when guess is sent from other player
                    if (this.guessesReceived !== null) node.done();
                    
                    that = this;
                    node.on.data('GUESSES', function(msg) { node.done();
                        that.guessesReceived = true;
                        node.done();
                    });


                }
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                donebutton: false,
                cb: function() {

                    node.game.buildGrid('gbrd', this.roundCounter);


                    //W.setInnerHTML('clue', this.clueReceived);
                    if(this.smallRoundCounter==0){//show clue given by other player
                        W.setInnerHTML('cluepasttxt', "Your first clue is ");
                        W.setInnerHTML('cluepast', this.clueReceived + ".");
                    }
                    if(this.smallRoundCounter==1){
                        W.setInnerHTML('cluepasttxt', "Your first clue was ");
                        W.setInnerHTML('cluepast', this.cluespast[this.cluespast.length-2] + ".");
                        W.setInnerHTML('cluepast0txt', "Your second clue is ");
                        W.setInnerHTML('cluepast0', this.clueReceived + ".");
                    }
                    if(this.smallRoundCounter==2){
                        W.setInnerHTML('cluepasttxt', "Your first clue was ");
                        W.setInnerHTML('cluepast', this.cluespast[this.cluespast.length-3] + ".");
                        W.setInnerHTML('cluepast0txt', "Your second clue was ");
                        W.setInnerHTML('cluepast0', this.cluespast[this.cluespast.length-2] + ".");
                        W.setInnerHTML('cluepast1txt', "Your third clue is ");
                        W.setInnerHTML('cluepast1', this.clueReceived + ".");
                    }

                    var el = W.getElementById("gbrd");

                    el.addEventListener('click', node.game.guessClickHandler); //add event listener
                },
                done: function() {//send signal for other player to end step, removes event listener so that these values cannot change
                    var el = W.getElementById("gbrd");
                    el.removeEventListener('click', node.game.guessClickHandler);
                    node.say('GUESSES', node.game.partner);
                    var memArray = node.game.memory.select('GuessOptions').and('customTimeStamp','!in', this.optionTimeArray).fetch();
                    var i;

                    for (i=0; i<memArray.length; i++) {//make into for loop with a bunch of if statements

                        if(i == 0){
                            node.set({GuessOption1 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION1_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }

                        if(i == 1){
                            node.set({GuessOption2 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION2_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 2){
                            node.set({GuessOption3 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION3_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 3){
                            node.set({GuessOption4 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION4_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 4){
                            node.set({GuessOption5 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION5_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 5){
                            node.set({GuessOption6 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION6_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 6){
                            node.set({GuessOption7 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION7_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 7){
                            node.set({GuessOption8 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION8_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }

                        this.optionTimeArray.push(memArray[i].customTimeStamp);

                    }
                }
            }
        }
    };

    stager.extendStep('guessOptionsprac', guessOptionsStepParams);

    const guessFinalStepParams = {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guess1Received = null;
                    node.game.guess2Received = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {
                    node.game.buildGrid('sbrd', this.roundCounter);


                    var that;//receives two messages, one for each guessed word. ends after receiving the second one
                    if (this.guess2Received !== null) node.done();
                    that = this;
                    node.on.data('GUESS1', function(msg) {
                        that.guess1Received = msg.data;
                    });
                    node.on.data('GUESS2', function(msg) {
                        that.guess2Received = msg.data;
                        node.done();
                    });
                }
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                donebutton: false,
                cb: function() {
                    W.setInnerHTML('clue2', "Please select your FINAL guesses." ),

                    node.game.buildGrid('gbrd', this.roundCounter);

                    this.answerCounter = 0;

                    var el = W.getElementById("gbrd");

                    el.addEventListener('click', node.game.guessClickHandler2);
                },
                done: function() {
                    node.say('GUESS', node.game.partner);
                }
            }
        }

    };

    stager.extendStep('guessFinalprac', guessFinalStepParams);

    stager.extendStep('feedbackprac', {//tells each player whether the guesser was successful
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'feedbackCG.htm',
                cb: function() {
                    var myDiv = W.getElementById("cganswers");
                    var myDiv2 = W.getElementById("cgcorrect");
                    var myDiv3 = W.getElementById("cgnextstep");
                    //var myDiv4 = W.getElementById("cgnextboard");
                    if(node.game.settings.pairList[this.roundCounter].includes(this.guess1Received)&&node.game.settings.pairList[this.roundCounter].includes(this.guess2Received)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundcounter%3 == 0){
                            myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        if(this.roundCounter == node.game.settings.pracpairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + node.game.settings.pairList[this.roundCounter][0] + " and " + node.game.settings.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        var k;
                        for(k=0; k < this.smallRoundCounter; k++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        if(this.roundCounter == node.game.settings.pracpairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            },
            GUESSER:{
                frame: 'feedbackGuesser.htm',
                cb: function() {
                    node.log('guess1 object: ' + JSON.stringify(node.game.memory.resolveTag("guess1")));
                    node.log('guess2 object: ' + JSON.stringify(node.game.memory.resolveTag("guess2")));

                    var guess1TXT = node.game.memory.resolveTag("guess1").Guess1;//use tags to get our response from memory and validate
                    var guess2TXT = node.game.memory.resolveTag("guess2").Guess2;

                    var myDiv = W.getElementById("ganswers");
                    var myDiv2 = W.getElementById("gcorrect");
                    var myDiv3 = W.getElementById("gnextstep");
                    if(node.game.settings.pairList[this.roundCounter].includes(guess1TXT)&&node.game.settings.pairList[this.roundCounter].includes(guess2TXT)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == node.game.settings.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + node.game.settings.pairList[this.roundCounter][0] + " and " + node.game.settings.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        var l;
                        for(l=0; l < this.smallRoundCounter; l++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == node.game.settings.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "The Speaker will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            }
        }
    });

    stager.extendStep('endprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'pracend.htm',
            },
            GUESSER:{
                frame: 'pracend.htm',
            }
        }
    });

    stager.extendStep('clueFinal', clueFinalStageParams);

    stager.extendStep('guessOptions', guessOptionsStepParams);

    stager.extendStep('guessFinal', guessFinalStepParams);

    stager.extendStep('feedback', {//tells each player whether the guesser was successful
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'feedbackCG.htm',
                cb: function() {
                    var myDiv = W.getElementById("cganswers");
                    var myDiv2 = W.getElementById("cgcorrect");
                    var myDiv3 = W.getElementById("cgnextstep");
                    if(node.game.settings.pairList[this.roundCounter].includes(this.guess1Received)&&node.game.settings.pairList[this.roundCounter].includes(this.guess2Received)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        if(this.roundcounter%3 == 0){
                            myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;

                        if(this.roundCounter == node.game.settings.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + node.game.settings.pairList[this.roundCounter][0] + " and " + node.game.settings.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var m;
                        for(m=0; m < this.smallRoundCounter; m++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;

                        if(this.roundCounter == node.game.settings.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            },
            GUESSER:{
                frame: 'feedbackGuesser.htm',
                cb: function() {
                    var guess1TXT = node.game.memory.resolveTag("guess1").Guess1;//use tags to get our response from memory and validate
                    var guess2TXT = node.game.memory.resolveTag("guess2").Guess2;

                    var myDiv = W.getElementById("ganswers");
                    var myDiv2 = W.getElementById("gcorrect");
                    var myDiv3 = W.getElementById("gnextstep");
                    if(node.game.settings.pairList[this.roundCounter].includes(guess1TXT)&&node.game.settings.pairList[this.roundCounter].includes(guess2TXT)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        if(this.roundcounter%3 == 0){
                            myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == node.game.settings.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + node.game.settings.pairList[this.roundCounter][0] + " and " + node.game.settings.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var n;
                        for(n=0; n < this.smallRoundCounter; n++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == node.game.settings.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "The Speaker will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            }
        }
    });

    stager.extendStep('demographics', {
        frame: 'demos.htm',
        cb: function() {
            this.demosnode = node.widgets.append('CustomInputGroup', W.gid('demoscontainer'), {//create customInputGroup widget for clue options, only the first is mandatory
               id: 'demosroot2',
               orientation: 'V',
               //mainText: 'Please list possible clues.',
               sharedOptions: {
               },
               items: [
                   {
                       id: 'age',
                       type: 'int',
                       mainText: 'What is your age',
                       requiredChoice: true
                   },
                   {
                       id: 'gender',
                       type: 'text',
                       mainText: 'What is your gender',
                       requiredChoice: true
                   },
                   {
                       id: 'education',
                       type: 'int',
                       mainText: 'How many years of formal education have you had (consider graduating high school to be 12 years)?',
                       requiredChoice: true

                   },
                   {
                       id: 'domHand',
                       type: 'text',
                       mainText: 'What is your dominant hand? (Left/Right/Ambidextrous)'
                   },
                   {
                       id: 'alert',
                       type: 'text',
                       mainText: 'Please indicate what time of the day you feel most alert (Morning/Afternoon/Evening/No differences)'
                   },
                   {
                       id: 'racial',
                       type: 'text',
                       mainText: 'Please indicate which racial categories apply to you, separated by commas (American Indian/Alaskan Native, Asian, Native Hawaiian or Other Pacific Islander, Black/African American, White/Caucasian, More than one race, Prefer Not to Respond)'
                   },
                   {
                       id: 'hispanic',
                       type: 'text',
                       mainText: 'Are you Hispanic or Latino? (Yes/No/Prefer Not to Respond)'

                   },
                   {
                       id: 'english',
                       type: 'text',
                       mainText: 'Is English your First Language? (Yes/No)',
                       requiredChoice: true
                   },
                   {
                       id: 'language',
                       type: 'text',
                       mainText: 'If you answered "No", what is your first language? (Please say English if you answered Yes)'
                   },
                   {
                       id: 'english5',
                       type: 'text',
                       mainText: 'Did you learn English before the age of 5?'
                   },
                   {
                       id: 'englishAge',
                       type: 'int',
                       mainText: 'If you answered "No", at what age did you learn English? (Enter 0 if you answered "Yes")'
                   },
                   {
                       id: 'msc',
                       type: 'text',
                       mainText: 'Is there anything we should know about, which might have affected your performance during the test session? (e.g., lack of sleep, feeling ill etc.)'
                   }
               ]

           });
        },
        done: function() {//this sends all data to the logic client and stores the values
            node.set({ID: this.id}),
            node.set({RandCode: this.randomCode}),
            node.set({age : this.demosnode.getValues().items['age'].value}),
            node.set({gender : this.demosnode.getValues().items['gender'].value}),
            node.set({education : this.demosnode.getValues().items['education'].value}),
            node.set({domHand : this.demosnode.getValues().items['domHand'].value}),
            node.set({alert : this.demosnode.getValues().items['alert'].value}),
            node.set({racial : this.demosnode.getValues().items['racial'].value}),
            node.set({hispanic : this.demosnode.getValues().items['hispanic'].value}),
            node.set({english : this.demosnode.getValues().items['english'].value}),
            node.set({language : this.demosnode.getValues().items['language'].value}),
            node.set({english5 : this.demosnode.getValues().items['english5'].value}),
            node.set({englishAge : this.demosnode.getValues().items['englishAge'].value}),
            node.set({msc : this.demosnode.getValues().items['msc'].value});
            return;
        }
    });

    stager.extendStep('end', {
        donebutton: false,
        frame: 'end.htm',
        cb: function() {
            //node.game.visualTimer.setToZero();
            var myDiv = W.getElementById("compcode");
            myDiv.innerHTML = "Your completion code is: " + this.randomCode;
        }
    });
};
