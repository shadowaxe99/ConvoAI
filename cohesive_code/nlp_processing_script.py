
import sys

def nlp_processing(input_data):
    return nlp_processing_function(input_data)

if __name__ == "__main__":
    input_data = sys.stdin.read().strip()
    response = nlp_processing(input_data)
    sys.stdout.write(response)
    sys.stdout.flush()
