#! /bin/bash
echo "Model Management Script"
echo ""
echo "Contact: Steven Velozo <steven@velozo.com>"
echo "License: MIT"
echo ""
echo "---"
echo ""
echo "Note: This script will fail if you have not run npm install in the project root folder."
echo ""

echo "--> Generating JSON model from DDL"
../node_modules/stricture/bin/stricture -i ./ddl/LibraryList.mddl -c Compile -f ./schema/ -o LibraryList

echo "--> Generating MySQL Create Statements"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c MySQL -f ./schema/mysql/ -o LibraryList-CreateDatabase

echo "--> Generating Meadow Schemas"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c Meadow -f ./schema/meadow/ -o "LibraryList-MeadowSchema-"

echo "--> Generating Graphs"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c Relationships -f ./diagrams/ -o "LibraryList-Relationships" -g
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c RelationshipsFull -f ./diagrams/ -o "LibraryList-Relationships-Full" -g

echo "--> Generating Test Object Containers"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c TestObjectContainers -f ./testdata/ -o "LibraryList"

echo "--> Generating Documentation"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c Documentation -f ./documentation/ -o "LibraryList-Model"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c AuthorizationChart -f ./documentation/authorizationchart/ -o "LibraryList-AuthorizationChart"
../node_modules/stricture/bin/stricture -i ./schema/LibraryList-Extended.json -c DataDictionary -f ./documentation/datadictionary/ -o "LibraryList-Model"
# Check if there is LaTeX and compile the data dictionary if it exists
echo "--> Checking for LaTeX"
LATEXCOMMAND=$(which pdflatex)
if [ -n "$LATEXCOMMAND" ]; then
	echo "  > Found pdflatex at: " $LATEXCOMMAND
	cd documentation/datadictionary
	echo "  > Building PDF Dictionary"
	$LATEXCOMMAND LibraryList-Model.tex
	$LATEXCOMMAND LibraryList-Model.tex
	echo "  > Cleaning up after Myself"
	rm *.toc
	rm *.log
	rm *.aux
	cd ../../
fi

echo "--> Code generation and compilation complete!"