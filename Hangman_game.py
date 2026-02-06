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
    word = random.choice(list_of_words).lower()
    turns = 10
    guessmade = set()
    global play_game
    
    while turns > 0:
        main_word = ""
        for letter in word:
            if letter in guessmade:
                main_word += letter
            else:
                main_word += "_ "
                
        if main_word.replace(" ", "") == word:
            print(f"Word: {word}")
            print("Congratulations! You won!")
            play_loop()
            return

        print("\nGuess the word:", main_word)
        print(f"Turns left: {turns}")
        
        guess = input("Enter a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single valid letter.")
            continue
            
        if guess in guessmade:
            print(f"You already guessed '{guess}'. Try again.")
            continue

        guessmade.add(guess)
            
        if guess not in word:
            turns -= 1
            print("Wrong guess!")
            
            if turns == 9:
                print("  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========")
            elif turns == 8:
                print("  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========")
            elif turns == 7:
                print("  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========")
            elif turns == 6:
                print("  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========")
            elif turns == 5:
                print("  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========")
            elif turns == 4:
                print("  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========")
            elif turns == 3:
                print("  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========")
            elif turns == 2:
                print("Hangman's getting close!")
            elif turns == 1:
                print("Final warning! Only 1 turn left!")

        if turns == 0:
            print("\n  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========")
            print("Wrong Guess. You are hanged!!!")
            print(f"The word was: {word}")
            play_loop()
            return


print("Welcome to game")
name = input('Enter your name:')
print('Hello '+name+' Best of luck!')
time.sleep(3)
print('Lets Start the Game')
time.sleep(3)

Hangman()


