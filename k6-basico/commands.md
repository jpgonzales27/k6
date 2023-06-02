k6 run nombreTest.js

k6 run --out json=output.json nombreTest.js

k6 run --summary-export=results.json nombreTest.js

execute all load tests -> 1 stress test -> 1 soak test

1 vus = 1 y 5 MB de memoria RAM por lo que si queremos
10000vus necesitamos entre 10 a 15 GB de RAM libre
