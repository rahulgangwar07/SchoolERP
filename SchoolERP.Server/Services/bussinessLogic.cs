using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Online_Exam;
using static SchoolERP.Server.Services.bussinessLogic;

    namespace SchoolERP.Server.Services
    {
        public class bussinessLogic
        {
            private SchoolERPContext _context;
            public bussinessLogic(SchoolERPContext context)
            {
                 _context = context;
            }

     

        public async Task<int> insertStudentInfo(Student_Other_info_DTO student_Other_Info)
        {
            // Logic for inserting student info
            var uid = _context.student_Other_Infos.OrderByDescending(soi => soi.uid).Select(soi => soi.uid).FirstOrDefault();
            student_Other_Info.uid = uid == 0 ? 1 : uid + 1;

            // Create new Student_Other_info object
            Student_Other_info _Other_Info = new Student_Other_info
            {
                uid = student_Other_Info.uid,
                first_name = student_Other_Info.first_name ?? "",
                last_name = student_Other_Info.last_name ?? "",
                gender = student_Other_Info.gender ?? "",
                mother_name = student_Other_Info.mother_name ?? "",
                father_name = student_Other_Info.father_name ?? "",
                branch = student_Other_Info.branch ?? "",
                description = student_Other_Info.description ?? "",
                city = student_Other_Info.city ?? "",
                address = student_Other_Info.address ?? "",
                contact_no = student_Other_Info.contact_no ?? "",
                alt_contact = student_Other_Info.alt_contact ?? "",
                email = student_Other_Info.email ?? "",
                counsellor = student_Other_Info.counsellor ?? "",
                reference = student_Other_Info.reference ?? "",
                pin_code = student_Other_Info.pin_code ?? "",
                dob = student_Other_Info.dob ?? DateTime.Now,
                academic_year = student_Other_Info.academic_year ?? "",
                school_id = student_Other_Info.school_id ?? "",
            };

            _context.Add(_Other_Info);
            await _context.SaveChangesAsync();

            // Insert into Student_reg
            Student_reg student_Reg = new Student_reg
            {
                uid = student_Other_Info.uid,
                reg_no = student_Other_Info.reg_no,
                adm_date = student_Other_Info.enquiry_date,
                status = "Pending",
                class_id = Convert.ToInt32(student_Other_Info.class_id),
                created_date = DateTime.Now,
                updated_date = DateTime.Now,
                school_id = student_Other_Info.school_id,
                session = student_Other_Info.academic_year
            };

            _context.Add(student_Reg);
            await _context.SaveChangesAsync();

            return student_Other_Info.uid;
        }

        public async Task<bool> updateStudentInfo(int uid, Student_Other_info_DTO student_Other_Info)
        { 
            var existingStudent = await _context.student_Other_Infos.FindAsync(uid);
            if (existingStudent == null)
            {
                return false;  
            }
             
            existingStudent.first_name = student_Other_Info.first_name ?? existingStudent.first_name;
            existingStudent.last_name = student_Other_Info.last_name ?? existingStudent.last_name;
            existingStudent.gender = student_Other_Info.gender ?? existingStudent.gender;
            existingStudent.mother_name = student_Other_Info.mother_name ?? existingStudent.mother_name;
            existingStudent.father_name = student_Other_Info.father_name ?? existingStudent.father_name;
            existingStudent.branch = student_Other_Info.branch ?? existingStudent.branch;
            existingStudent.description = student_Other_Info.description ?? existingStudent.description;
            existingStudent.city = student_Other_Info.city ?? existingStudent.city;
            existingStudent.address = student_Other_Info.address ?? existingStudent.address;
            existingStudent.contact_no = student_Other_Info.contact_no ?? existingStudent.contact_no;
            existingStudent.alt_contact = student_Other_Info.alt_contact ?? existingStudent.alt_contact;
            existingStudent.email = student_Other_Info.email ?? existingStudent.email;
            existingStudent.counsellor = student_Other_Info.counsellor ?? existingStudent.counsellor;
            existingStudent.reference = student_Other_Info.reference ?? existingStudent.reference;
            existingStudent.pin_code = student_Other_Info.pin_code ?? existingStudent.pin_code;
            existingStudent.dob = student_Other_Info.dob ?? existingStudent.dob;
            existingStudent.academic_year = student_Other_Info.academic_year ?? existingStudent.academic_year;
            existingStudent.school_id = student_Other_Info.school_id ?? existingStudent.school_id;

            // Save updated changes
            _context.Update(existingStudent);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> updateStudentReg(int uid, Student_Other_info_DTO student_Other_Info)
        {
            var existingReg = await _context.student_Regs
                                            .Where(sr => sr.uid == uid && sr.school_id == student_Other_Info.school_id)
                                            .FirstOrDefaultAsync();

            if (existingReg == null)
            {
                return false;
            }
            existingReg.adm_date = student_Other_Info.enquiry_date ?? existingReg.adm_date;
            existingReg.registration_amt = student_Other_Info.registration_amt ?? existingReg.registration_amt;
            existingReg.mode = student_Other_Info.mode ?? existingReg.mode;
            existingReg.class_id = student_Other_Info.class_id ?? existingReg.class_id;
            existingReg.session = student_Other_Info.academic_year ?? existingReg.session;
            existingReg.updated_date = DateTime.Now;
            _context.Update(existingReg);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task insertStudentMaster(Student_Other_info2 student_Other_Info)
        {
            int stuId = await _context.tb_studentmasters.Where(sm => sm.school_id == student_Other_Info.school_id).MaxAsync(sm => (int?)sm.stu_id) ?? 0; // Set an appropriate student ID
            var studentMaster = new tb_studentmaster
            {
                uid = student_Other_Info.uid,
                stu_id = stuId + 1,
                registration_no = student_Other_Info.reg_no,
                class_id = Convert.ToInt32(student_Other_Info.class_id),
                sec_id = Convert.ToInt32(student_Other_Info.sec_id),
                status = "Registered",
                isNew = true,
                isActive = true,
                session = student_Other_Info.academic_year,
                school_id = student_Other_Info.school_id ?? ""
            };

            await _context.tb_studentmasters.AddAsync(studentMaster);
            await _context.SaveChangesAsync();
        }

        // Update method
        public async Task updateStudentMaster(tb_studentmaster existingStudentMaster, Student_Other_info2 student_Other_Info)
        {
            existingStudentMaster.registration_no = student_Other_Info.reg_no;
            existingStudentMaster.class_id = Convert.ToInt32(student_Other_Info.class_id);
            existingStudentMaster.sec_id = Convert.ToInt32(student_Other_Info.sec_id);
            existingStudentMaster.session = student_Other_Info.academic_year;
            existingStudentMaster.school_id = student_Other_Info.school_id ?? "";

            _context.Update(existingStudentMaster);
            await _context.SaveChangesAsync();
        }




        public async Task<int> getStuID(string school_id, string session, int class_id, int uid)
        {
            int stu_id = await _context.tb_studentmasters.Where(se => se.school_id == school_id && se.session == session &&
            (se.class_id == class_id || class_id == 0 ) && se.uid == uid).Select(sp => sp.stu_id).FirstOrDefaultAsync();
            return stu_id;
        }
        public async Task<Dictionary<int,string>> getSubjects(string school_id)
        {
             Dictionary<int,string> subjects = await _context.subjects.Where(se => se.school_id == school_id)
                .ToDictionaryAsync(s => s.subject_id,s => s.subject_name);
            return subjects;
        }

        public async Task<StudentResult> GetStudentResult(string school_id, int exam_id, int stu_exam_id)
        {
            var subjects = await _context.subjects.Where(se => se.school_id == school_id)
                .ToDictionaryAsync(s => s.subject_id, s => s.subject_name);

            var exam = await _context.exams.Where(ex => ex.school_id == school_id && ex.exam_id == exam_id).FirstOrDefaultAsync();
            if (exam == null) return null;  

            var stu_exam = await _context.student_Exams.Where(se => se.school_id == school_id && se.student_exam_id == stu_exam_id).FirstOrDefaultAsync();
            if (stu_exam == null) return null;  

            var questions = await _context.questions.Where(se => se.school_id == school_id && se.exam_id == exam_id && se.isActive).ToListAsync();
            var stu_answers = await _context.student_Answers.Where(se => se.school_id == school_id && se.student_exam_id == stu_exam_id).ToListAsync();

            var result = new StudentResult
            {
                question_count = questions.Count(),
                attempted = stu_answers.Count(),
                correct = stu_answers.Count(s => s.marks_awarded != 0),
                wrong = stu_answers.Count() - (stu_answers.Count(s => s.marks_awarded != 0)),
                string_rate = questions.Count() > 0 ? ((float)(stu_answers.Count(s => s.marks_awarded != 0)) / questions.Count())*100 : 0,
                attempt_date = stu_exam.create_date
            };

            result.answer_sheet = exam.ans_sheet_status;

            return result;
        }



        
    }
}
