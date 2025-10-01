let i;

console.log('\n------for-------\n');
for (i = 0; i < 10; i++) {
    console.log(i);
}

console.log('\n------while-------\n');
i = 0;
while ( i < 10 ) {
    console.log(i);
    i++;
}

console.log('\n------for-------\n');
for (i = 100; i > -1; i -= 10) {
    console.log(i);
}

console.log('\n------while-------\n');
i = 100;
while (i > -1) {
    console.log(i);
    i -= 10;
}
