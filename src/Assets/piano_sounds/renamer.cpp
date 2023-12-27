#include <filesystem>
#include <string>
#include <vector>
#include <iostream>

namespace fs = std::filesystem;

int main(){
    std::string path = "./";
    std::vector<std::string> already_names;
    for (const auto & entry : fs::directory_iterator(path)){
        if(entry.path().string().length() > 15){
            const std::string new_name = entry.path().string().substr(20,6);
            bool is_in = false;
            for(int x = 0; x < already_names.size(); x++){
                if(already_names[x] == new_name){
                    is_in=true;
                }
            }
            if(!is_in){
                rename(entry,new_name);
                already_names.push_back(new_name);
            }else{
                const std::string edited_name = new_name.substr(0,1) + "s" + new_name.substr(1,5);
                rename(entry,edited_name);
                already_names.push_back(edited_name);
            }
            std::cout << already_names[already_names.size()-1] << std::endl;
        }
    }
        
}