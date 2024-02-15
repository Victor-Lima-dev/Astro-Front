let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlRlc3RlIiwianRpIjoiY2IyZTQ2NTctZjc2YS00OGY3LWJjYmEtN2YzOWE2YjhjOWJkIiwiZXhwIjoxNzI5NDQzNzUxfQ.wdnlnzCQwbbEyBS9JCPplt8D8svNLdJmze0BXkER3Bg";

    
let intervalId; // Variável para armazenar o ID do intervalo


let quantidade = 3;

let perguntasConsultadas = false;

let debounceTimer;

const urlTeste = 'http://localhost:5084'

const urlProd = 'http://172.203.230.21:8002'

const urlAPI = urlProd + '/api/';

const urlAPITeste = urlTeste + '/api/';

