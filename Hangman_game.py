import time
import random

def play_loop():
    global play_game
    play_game = input("Do you wanna play again? y = yes, n = no ")
    while play_game not in ["Y","y","N","n"]:
        play_game= input("Do you wanna play again? y = yes, n = no ")
    if play_game == "y":
        Hangman()
    elif play_game == "n":
        print("Thanks for playing ")
        exit()

def Hangman():


    list_of_words = ["January","Border","Image","Flim","promise","kids","Lungs","Doll","Rhyme","Damage","Plants"]
    word = random.choice(list_of_words)
    turns = 5 
    guessmade = ''
    a = set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    global play_game
    
    while len(word)>0:
        main_word = ""
        missed = 0
        
        for letter in word:
            if letter in guessmade:
                main_word = main_word+letter
            else:
                main_word = main_word+"_ "
                
        if main_word == word:
            print(main_word)
            print("Congratulations! you won")
            play_loop()
            break

        print("Guess the word", main_word)
        guess = input()

        if guess in a:
            guessmade = guessmade+guess
        else:
            print(" Enter valid character ")
            guess = input()
            
            
        if guess not in word:
            turns = turns-1
            
        if turns == 4:
            print('''____________\n
            |  \n
            |  \n
            |  \n
            |  \n
            |  \n
            |  \n
            _|_\n''')
            print("Wrong guess")
            
        if turns == 3:
            print('''____________\n
            | |\n
            | |\n
            |  \n
            |  \n
            |  \n
            |  \n
            _|_\n''')
            print("Wrong Guess.")
            
        if turns == 2:
            print('''____________\n
            | |\n
            | |\n
            | |\n
            |  \n
            |  \n
            |  \n
            _|_\n''')
            print("Wrong guess")
            
        if turns == 1:
            print('''____________\n
            | |\n
            | |\n
            | |\n
            | 0\n
            |  \n
            \  \n
            _|_\n''')
            print("Wrong Guess. only 1 turns left")
            
        if turns == 0:
            print('''____________\n
            | |\n
            | |\n
            | |\n
            | 0\n
            |/|\ \n
            |/ \ \n
            _|_\n''')
            print("Wrong Guess.you are hanged!!!")
            play_loop()
            break


print("Welcome to game")
name = input('Enter your name:')
print('Hello '+name+' Best of luck!')
time.sleep(3)
print('Lets Start the Game')
time.sleep(3)

Hangman()


