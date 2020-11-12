// Initialize Record Array - empty list that stores all records
var record_array= []

// Initialize Index_number - Creates Index object
var index_number = 0

// Initialize output field (Line 10 to Line 19)

// Select the output field
var output_field = d3.select("#record-display-field")

// Clear the output field of any existing objects
output_field.selectAll('h2').remove();
output_field.selectAll('table').remove();

// Post a message in the console that users need to add records
output_field.append("h2")
    .classed('deleted-record-message', true)
    .text(`The address book is currently empty. Please create some records using the form below.`)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION ONE: CREATE

// Select the Create button
var create_button = d3.select("#create_button");

// Create an On-Click function that fires the create function when clicked
create_button.on("click", create_new_record);

function create_new_record() {

    console.log("User clicked CREATE")
    
    // Select the first name input element and retrieve the value
    var first_name_input = d3.select("#first-name-form-field");
    var first_name_input_value = first_name_input.property("value");

    // Select the last name input element and retrieve the value
    var last_name_input = d3.select("#last-name-form-field");
    var last_name_input_value = last_name_input.property("value");

    // Select the address input element and retrieve the value
    var address_input = d3.select("#address-form-field");
    var address_input_value = address_input.property("value");

    // Select the city input element and retrieve the value
    var city_input = d3.select("#city-form-field");
    var city_input_value = city_input.property("value");

    // Select the state input element and retrieve the value
    var state_input = d3.select("#state-form-field");
    var state_input_value = state_input.property("value");

    // Select the zipcode input element and retrieve the value
    var zipcode_input = d3.select("#zip-form-field");
    var zipcode_input_value = zipcode_input.property("value");

    if (first_name_input_value == '') {
        first_name_input_value = "null"
    }
    
    if (last_name_input_value == '') {
        last_name_input_value = "null"
    }
    
    if (address_input_value == '') {
        address_input_value = "no address given"
    }
    
    if (city_input_value == '') {
        city_input_value = "null"
    }
    
    if (state_input_value == '') {
        state_input_value = "null"
    }

    if (zipcode_input_value == '') {
        zipcode_input_value = "null"
    } 

    // Add each element to a new record dictionary
    var new_record = {
        index: index_number,
        first_name: first_name_input_value,
        last_name: last_name_input_value,
        address: address_input_value,
        city: city_input_value,
        state: state_input_value,
        zip:zipcode_input_value
    }

    // Add the new record dictionary to the Record Array
    record_array.push(new_record);

    // Add the index to the dropdown
    var record_dropdown = d3.selectAll("#record-selector-dropdown")
        .append('option')
        .classed(`Option ${index_number}`, true)
        .text(index_number)
        .exit()
        .remove() 
    
    // Select the output field
    var output_field = d3.select("#record-display-field")
        
    // Clear the output field of any existing objects
    output_field.selectAll('h2').remove();
    output_field.selectAll('table').remove();

    // Post a message in the console that the record was created
    output_field.append("h2")
        .classed('successful-record-message', true)
        .text(`New record successfully created (Record ${index_number}). Use the dropdown menu to select this record.`)

    console.log("New Record Created", new_record)

    // Advance the index number by 1
    index_number+=1
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION 2: GET

// Select the Get button
var get_button = d3.select("#get_button");

// Create an On-Click function that fires the Get function when clicked
get_button.on("click", get_record)

function get_record() {
    
    console.log("User clicked GET")

    // Select the value of the dropdown selection (the index number)
    var selected_record = d3.select("#record-selector-dropdown");
    var selected_record_value = selected_record.property("value");

    // Select the output field
    var output_field = d3.select("#record-display-field")
        
    // Clear the output field of any existing objects
    output_field.selectAll('h2').remove();
    output_field.selectAll('table').remove();

    // If there are no records in the system, print a message
    if(record_array.length < 1) {
    
        output_field.append("h2")
            .classed('deleted-record-message', true)
            .text(`There are no records in the system. Please create some records.`)
    
    // Otherwise, continue with the get function
    } else {

        console.log(`User selected: ${selected_record_value}`)

        // Use the selected value (index) as an index to reference the correct record
        var selected_record_dictionary = record_array[selected_record_value]

        // If the record has been deleted (with all values in the dictionary = "deleted"), return a message.
        if (record_array[selected_record_value].first_name=="deleted") {
            
            output_field.append("h2")
                .classed('deleted-record-message', true)
                .text(`Record ${selected_record_value} has been removed. It can be replaced by completing the form below and clicking "Update Selected Contact."`)
        
        // Otherwise retrieve the record values
        } else {
        
            // Create a table to display the data
            var output_table = output_field
                    .append("table")
                    .classed("output-table", true)
            
            // Create headers for each column
                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("Index")

                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("First Name")
                
                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("Last Name")
                
                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("Address")
            
                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("City")
                
                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("State")
                
                output_table
                    .append("th")
                    .classed("output-table-headers", true)
                    .text("Zip Code")
                
                // Append a table row containing the data related to the record    
                var output_table_row = output_table.append("tr")
                
                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(selected_record_dictionary.index)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(selected_record_dictionary.first_name)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                        .text(selected_record_dictionary.last_name)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(selected_record_dictionary.address)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(selected_record_dictionary.city)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(selected_record_dictionary.state)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(selected_record_dictionary.zip)
                
        }

    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION 3: LIST

// Select the List button
var list_button = d3.select("#list_button");

// Create an On-Click function that fires the List function when clicked
list_button.on("click", list_all_records)

function list_all_records() {

    console.log("User clicked LIST")

    // Select the output field
    var output_field = d3.select("#record-display-field")

    // Clear the output field of any existing objects
    output_field.selectAll('h2').remove();
    output_field.selectAll('table').remove();

    // If there are no records in the system, print a message
    if(record_array.length < 1) {
    
        output_field.append("h2")
            .classed('deleted-record-message', true)
            .text(`There are no records in the system. Please create some records.`)
    
    // Otherwise, show all data
    } else {

        // Create a table to display the data
        var output_table = output_field
                .append("table")
                .classed("output-table", true)
        
        // Create headers for each column
            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("Index")

            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("First Name")
            
            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("Last Name")
            
            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("Address")
        
            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("City")
            
            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("State")
            
            output_table
                .append("th")
                .classed("output-table-headers", true)
                .text("Zip Code")
            
        // Fill the table with data from each record
        record_array.forEach(record => {
            var output_table_row = output_table.append("tr")
            
            // If the value of the record = "deleted," highlight the records red using special CSS
            if (record.first_name == "deleted") {
                
                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                    .text(record.index)

                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                    .text(record.first_name)

                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                        .text(record.last_name)

                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                    .text(record.address)

                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                    .text(record.city)

                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                    .text(record.state)

                output_table_row.append('td')
                    .classed("output-cell-format-for-deleted-record", true)
                    .text(record.zip)
            
            // Otherwise, apply standard CSS
            } else {
                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(record.index)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(record.first_name)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                        .text(record.last_name)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(record.address)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(record.city)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(record.state)

                output_table_row.append('td')
                    .classed("output-cell-format", true)
                    .text(record.zip)
            }
                
        }) // Close ForEach() - Line 328

    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION 4: UPDATE

// Select the Update button
var get_button = d3.select("#update_button");

// Create an On-Click function that fires the update function when clicked
get_button.on("click", update_record)

function update_record() {

    console.log("User clicked UPDATE")

    // Select the output field
    var output_field = d3.select("#record-display-field")
        
    // Clear the output field of any existing objects
    output_field.selectAll('h2').remove();
    output_field.selectAll('table').remove();

    // If there are no records in the system, print a message
    if(record_array.length < 1) {
    
        output_field.append("h2")
            .classed('deleted-record-message', true)
            .text(`There are no records in the system. Please create some records.`)
    
    // Otherwise, continue with the update function
    } else {
    
        // Select the value of the dropdown selection (the index number)
        var selected_record = d3.select("#record-selector-dropdown");
        var selected_record_value = selected_record.property("value");

        console.log(`user selected: ${selected_record_value}`)

        // Use the selected value (index) as an index to reference the correct record
        var selected_record_dictionary = record_array[selected_record_value]
        console.log("pre-update", selected_record_dictionary)

        // Select the first name input element and retrieve the value
        var update_first_name_input = d3.select("#first-name-form-field");
        var update_first_name_input_value = update_first_name_input.property("value");

        // Select the last name input element and retrieve the value
        var update_last_name_input = d3.select("#last-name-form-field");
        var update_last_name_input_value = update_last_name_input.property("value");

        // Select the address input element and retrieve the value
        var update_address_input = d3.select("#address-form-field");
        var update_address_input_value = update_address_input.property("value");

        // Select the city input element and retrieve the value
        var update_city_input = d3.select("#city-form-field");
        var update_city_input_value = update_city_input.property("value");

        // Select the state input element and retrieve the value
        var update_state_input = d3.select("#state-form-field");
        var update_state_input_value = update_state_input.property("value");

        // Select the zipcode input element and retrieve the value
        var update_zipcode_input = d3.select("#zip-form-field");
        var update_zipcode_input_value = update_zipcode_input.property("value");

        // If the user clicks the button with a missing field, fill the null value
        if (update_first_name_input_value == '') {
            update_first_name_input_value = "null"
        }
        
        if (update_last_name_input_value == '') {
            update_last_name_input_value = "null"
        }
        
        if (update_address_input_value == '') {
            update_address_input_value = "no address given"
        }
        
        if (update_city_input_value == '') {
            update_city_input_value = "null"
        }
        
        if (update_state_input_value == '') {
            update_state_input_value = "null"
        }

        if (update_zipcode_input_value == '') {
            update_zipcode_input_value = "null"
        } 

        // Update each entry using the existing value and the updated field
        selected_record_dictionary.first_name = update_first_name_input_value
        selected_record_dictionary.last_name = update_last_name_input_value
        selected_record_dictionary.address = update_address_input_value
        selected_record_dictionary.city = update_city_input_value
        selected_record_dictionary.state = update_state_input_value
        selected_record_dictionary.zip = update_zipcode_input_value

        // Post a message in the console that the record was updated
        output_field.append("h2")
            .classed('successful-record-message', true)
            .text(`Record ${selected_record_value} successfully updated.`)

        // Print the updated record in the console
        console.log("Post update", selected_record_dictionary)

    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION 5: REMOVE

// Select the Remove button
var delete_button = d3.select("#delete_button");

// Create an On-Click function that fires the remove function when clicked
delete_button.on("click", remove_record)

function remove_record() {

    console.log("User clicked DELETE")

    // Select the value of the dropdown selection (the index number)
    var selected_record = d3.select("#record-selector-dropdown");
    var selected_record_value = selected_record.property("value");

    // Select the output field
    var output_field = d3.select("#record-display-field")
        
    // Clear the output field of any existing objects
    output_field.selectAll('h2').remove();
    output_field.selectAll('table').remove();

    // If there are no records in the system, print a message
    if(record_array.length < 1) {
    
        output_field.append("h2")
            .classed('deleted-record-message', true)
            .text(`There are no records in the system. Please create some records.`)
    
    // Otherwise, continue with the delete function
    } else {

        console.log(`User selected: ${selected_record_value}`)

        record_array[selected_record_value].first_name = "deleted"
        record_array[selected_record_value].last_name = "deleted"
        record_array[selected_record_value].address = "deleted"
        record_array[selected_record_value].city = "deleted"
        record_array[selected_record_value].state = "deleted"
        record_array[selected_record_value].zip = "deleted"

        // Post a message in the console that the record was deleted
        output_field.append("h2")
            .classed('successful-record-message', true)
            .text(`Record ${selected_record_value} Deleted. This record can be restored by completing the form below and clicking and clicking "Update Selected Contact."`)

        console.log(`Record ${selected_record_value} deleted.`)
    }
        
}