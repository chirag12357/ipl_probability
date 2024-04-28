from django.shortcuts import render

# Create your views here.
def calculate(request):
    teams = ["RCB", "MI", "CSK", "KKR", "DC", "KXIP", "RR", "SRH", "GT", "LSG"]
    matches = []
    for i in range(len(teams)):
        for j in range(i+1, len(teams)):
            matches.append(teams[i] + " vs " + teams[j])
    print(matches)
    return render(request, 'probability/calculate.html', {})